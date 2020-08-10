import crypto from 'crypto';
import leveljs from 'level-js';
import memdown from 'memdown';

import { Client } from '@dxos/client';
import { Keyring, KeyType, KeyStore } from '@dxos/credentials';
import { InviteDetails, InviteType } from '@dxos/party-manager';

import { BaseContext } from './base-context';

export function withClientContext (AgentClass) {
  return class Context extends ClientContext {
    async init (opts) {
      await super.init(opts);

      this._agent = new AgentClass(this);
    }

    async initAgent () {
      await this._agent.init();
    }

    async tick (opts) {
      await this._agent.tick(opts);
    }
  };
}

export class ClientContext extends BaseContext {
  constructor (opts = {}) {
    super(opts);

    this._secret = '0000';
    this._client = null;

    this._greeterSecretProvider = () => Buffer.from(this._secret);
    this._greeterSecretValidator = (invitation, secret) => secret && secret.equals(invitation.secret);
    this._inviteeSecretProvider = () => Buffer.from(this._secret);
  }

  get identityPublicKey () {
    return this._identityPublicKey;
  }

  async init (opts = {}) {
    const keyStorage = opts.storage === 'ram' || typeof browser === 'undefined' ? memdown() : leveljs(`${crypto.randomBytes(32).toString('hex')}/keystore`);
    const keyring = new Keyring(new KeyStore(keyStorage));
    await keyring.createKeyRecord({ type: KeyType.IDENTITY });
    this._client = new Client({ storage: this._createStorage(opts.storage), keyring, swarm: { signal: 'ws://localhost:4000' } });
    await this._client.initialize();
    await this._client.partyManager.identityManager.initializeForNewIdentity();
    this._identityPublicKey = this._client.partyManager.identityManager.deviceManager.publicKey;
    this._feedStore = this._client.feedStore;
    this._modelFactory = this._client.modelFactory;
    await super.init();
  }

  async createParty () {
    const party = await this._client.partyManager.createParty();
    const partyInfo = this._client.partyManager.getPartyInfo(party.publicKey);
    partyInfo.on('update', () => this._onPartyUpdate(partyInfo));
    return { publicKey: party.publicKey };
  }

  createInvitation (partyPublicKey) {
    return this._client.partyManager.inviteToParty(
      partyPublicKey,
      new InviteDetails(InviteType.INTERACTIVE, {
        secretProvider: this._greeterSecretProvider,
        secretValidator: this._greeterSecretValidator
      })
    );
  }

  async joinParty (invitation) {
    const party = await this._client.partyManager.joinParty(invitation, this._inviteeSecretProvider);
    const partyInfo = this._client.partyManager.getPartyInfo(party.publicKey);
    partyInfo.on('update', () => this._onPartyUpdate(partyInfo));
  }

  getParties () {
    return this._client.partyManager.getPartyInfoList();
  }

  _onPartyUpdate (partyInfo) {
    const members = partyInfo.members.map(m => ({
      publicKey: m.publicKey,
      displayName: m.displayName
    }));

    this.emit('party-update', { publicKey: partyInfo.publicKey, members });
  }
}
