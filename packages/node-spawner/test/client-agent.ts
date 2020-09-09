import { DefaultModel } from '@dxos/model-factory';
import { Agent } from '../src/runtime/agent';
import { JsonObject, Json } from '../src/common';
import { Environment } from '../src/runtime/node';
import { createClientFromEnvironment } from '../src/setup';
import { InviteDetails, InviteType } from '@dxos/party-manager';

export default class ClientAgent implements Agent {
  private _count = 0;

  private _client: any;

  private _party: any;

  private _model: any;

  constructor (private environment: Environment) {
  }

  async init () {
    this._client = await createClientFromEnvironment(this.environment);

    
  }

  private async _initModel() {
    const topic = this._party.publicKey.toString('hex');

    this._model = await this._client._modelFactory.createModel(DefaultModel, { topic, type: 'dxos.testing.Message' });

    this._model.on('preappend', () => {
      this.environment.metrics.inc('appended');
    });
    this._model.on('update', () => {
      this.environment.metrics.inc('updated');
    });
  }

  onEvent (event: JsonObject) {
    this._count++;

    this._model.appendMessage({ count: this._count, __type_url: 'dxos.testing.Message' });

    this.environment.logMessage('Count is now', this._count);
  }

  async snapshot () {
    return {
      count: this._count,
      model: JSON.parse(JSON.stringify(this._model))
    };
  }

  async destroy () {
    await this._client.destroy();
  }

  async createParty() {
    this._party = await this._client.partyManager.createParty();
    await this._initModel();

    return this._party.publicKey;
  }

  async createInvitation(party: Uint8Array) {
    return this._client.partyManager.inviteToParty(
      Buffer.from(party),
      new InviteDetails(InviteType.INTERACTIVE, {
        secretProvider: () => Buffer.from('0000'),
        secretValidator: () => true,
      })
    );
  }

  async joinParty(partyKey: Uint8Array, invitation: Json) {
    this._party = await this._client.partyManager.joinParty(invitation, () => Buffer.from('0000'));
    await this._initModel();
  }
}
