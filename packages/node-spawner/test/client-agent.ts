import { DefaultModel } from '@dxos/model-factory';
import { Agent } from '../src/runtime/agent';
import { JsonObject } from '../src/common';
import { Environment } from '../src/runtime/node';
import { createClientFromEnvironment } from '../src/setup';

export default class ClientAgent implements Agent {
  private _count = 0;

  private _client: any;

  private _model: any;

  constructor (private environment: Environment) {
  }

  async init () {
    this._client = await createClientFromEnvironment(this.environment);

    const party = await this._client.partyManager.createParty();
    const topic = party.publicKey.toString('hex');

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
}
