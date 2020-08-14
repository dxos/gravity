import memdown from 'memdown';
import { Client } from '@dxos/client';
import { Keyring, KeyType, KeyStore } from '@dxos/credentials';
import { InviteDetails, InviteType } from '@dxos/party-manager';
import { randomBytes } from '@dxos/crypto';
import { createStorage } from '@dxos/random-access-multi-storage';
import { DefaultModel } from '@dxos/model-factory';

import { Environment } from '../src/node';
import { Agent } from '../src/agent';
import { JsonObject } from '../src/common';

export default class ClientAgent extends Agent {
  private _count = 0;

  private _client: any;

  private _model: any;

  constructor (private environment: Environment) {
    super();
  }

  async init () {
    const keyStorage = memdown();
    const keyring = new Keyring(new KeyStore(keyStorage));
    await keyring.createKeyRecord({ type: KeyType.IDENTITY });
    const storage = createStorage(`.temp/${randomBytes(32).toString('hex')}`);
    this._client = new Client({ storage, keyring, swarm: { signal: 'ws://localhost:4000' } });
    await this._client.initialize();
    await this._client.partyManager.identityManager.initializeForNewIdentity();

    const party = await this._client.partyManager.createParty();
    const topic = party.publicKey.toString('hex');

    this._model = await this._client._modelFactory.createModel(DefaultModel, { topic, type: 'dxos.testing.Message' });
  }

  onEvent (event: JsonObject) {
    this._count++;

    this._model.appendMessage({ count: this._count, __type_url: 'dxos.testing.Message' });

    this.environment.logMessage('Count is now', this._count);
  }

  snapshot (): JsonObject {
    return {
      count: this._count,
      model: JSON.parse(JSON.stringify(this._model))
    };
  }
}
