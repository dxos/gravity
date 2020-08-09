//
// Copyright 2020 DXOS.org
//

import bufferJson from 'buffer-json-encoding';
import swarm from '@geut/discovery-swarm-webrtc';
import wrtc from 'wrtc';

import { randomBytes, discoveryKey } from '@dxos/crypto';
import { FeedStore } from '@dxos/feed-store';
import { ModelFactory } from '@dxos/model-factory';
import { Protocol } from '@dxos/protocol';
import { DefaultReplicator } from '@dxos/protocol-plugin-replicator';

import { BaseContext } from './base-context';

export function withMinimalContext (AgentClass) {
  return class Context extends MinimalContext {
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

export class MinimalContext extends BaseContext {
  constructor (opts = {}) {
    super(opts);

    this._ownerFeed = null;
    this._partyPublicKey = null;
  }

  async init (opts = {}) {
    this._identityPublicKey = randomBytes(32);
    this._feedStore = await FeedStore.create(this._createStorage(opts.storage), {
      feedOptions: {
        valueEncoding: 'buffer-json'
      },
      codecs: {
        'buffer-json': bufferJson
      }
    });
    this._modelFactory = new ModelFactory(this._feedStore, {
      onAppend: async (message, { topic }) => {
        this._ownerFeed.append(message, () => {});
      }
    });
    this._feedStore.on('feed', this._onFeed.bind(this));
    this._createSwarm();
    await super.init();
  }

  async createParty () {
    const publicKey = randomBytes(32);
    await this.joinParty({ publicKey });
    return { publicKey: this._partyPublicKey };
  }

  createInvitation () {
    return { publicKey: this._partyPublicKey };
  }

  async joinParty ({ publicKey }) {
    this._partyPublicKey = publicKey;
    this._ownerFeed = await this._feedStore.openFeed('/owner', { metadata: { topic: this._partyPublicKey.toString('hex') } });
    this._swarm.join(discoveryKey(publicKey));
  }

  getParties () {
    return [{ publicKey: this._partyPublicKey }];
  }

  _createSwarm () {
    const replicator = new DefaultReplicator({
      feedStore: this._feedStore,
      onLoad: () => this._feedStore.getOpenFeeds()
    });

    this._swarm = swarm({
      bootstrap: ['ws://localhost:4000'],
      stream: ({ channel }) => {
        const p = new Protocol({
          discoveryToPublicKey: (dk) => dk.equals(discoveryKey(this._partyPublicKey)) ? this._partyPublicKey : null,
          streamOptions: {
            timeout: 50 * 1000,
            live: true
          }
        })
          .setSession({ peerId: this._identityPublicKey })
          .setExtensions([
            replicator.createExtension()
          ])
          .init(channel);

        p.on('error', (err) => {
          this._log('protocol-error', { err });
        });

        return p.stream;
      },
      simplePeer: {
        wrtc
      }
    });

    this._swarm.on('error', (err) => {
      this._log('swarm-error', { err });
    });
    this._swarm.on('connection-error', (err) => {
      this._log('connection-error', { err });
    });
    this._swarm.on('connection-closed', () => {
      this._log('swarm-connection-closed');
    });
  }

  _onFeed () {
    const members = this._feedStore.getOpenFeeds().map(p => ({
      publicKey: p.key,
      displayName: p.key.toString('hex')
    }));
    this.emit('party-update', { publicKey: this._partyPublicKey, members });
  }
}
