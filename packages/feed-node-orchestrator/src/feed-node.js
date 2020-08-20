//
// Copyright 2020 DXOS.org
//

import assert from 'assert';
import debug from 'debug';

import { discoveryKey, humanize } from '@dxos/crypto';
import { Protocol } from '@dxos/protocol';
import { DefaultReplicator } from '@dxos/protocol-plugin-replicator';

const log = debug('dxos:feed-store-node');

export class FeedNode {
  // Note this is required by the network-generator
  /** @type {Key} */
  id;

  /** @type {FeedStore} */
  _feedStore;

  /** @type {Feed} */
  _feed;

  /** @type {ProtocolExtension} */
  _replicator;

  /** @type {Boolean} */
  closed;

  constructor (agentNetworkInterface) {
    const { feedStore, feed } = agentNetworkInterface;
    assert(feedStore);
    assert(feed);
    this._feedStore = feedStore;
    this._feed = feed;
  }

  /**
   * @return {FeedAgent}
   */
  getAgent () {
    return this._agent;
  }

  /**
   * Set this node's associated agent.
   * @param agent {FeedAgent}
   */
  setAgent (agent) {
    this._agent = agent;
  }

  /**
   *
   * @param topic {Key}
   * @param peerId {Key}
   * @returns {Promise<FeedReplicationPeer>}
   */
  async initialize (topic, peerId) {
    this.id = peerId;
    this.topic = topic;
    this.closed = false;

    this._replicator = new DefaultReplicator({
      feedStore: this._feedStore,
      onLoad: () => [this._feed],
      onUnsubscribe: () => {
        this.closed = true;
      }
    });
    log(`Created peer ${humanize(peerId)}`);
  }

  // Note this is required by the network-generator
  createStream () {
    // TODO(dboreham): We believe that topic is required in init(discoveryKey(this.topic) below.
    // However it appears that even if this.topic is undefined, our tests pass.
    assert(this.topic);
    assert(this._feedStore);
    return new Protocol({
      streamOptions: {
        live: true
      }
    })
      .setSession({ id: 'session1' })
      .setContext({ name: 'foo' })
      .setExtensions([this._replicator.createExtension()])
      .init(discoveryKey(this.topic))
      .stream;
  }

  isClosed () {
    return this.closed;
  }
}
