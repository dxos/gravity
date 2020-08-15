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
  /** @type {Key} */
  id;

  /** @type {FeedStore} */
  feedStore;

  /** @type {Feed} */
  feed;

  /** @type {ProtocolExtension} */
  replicator;

  /** @type {Boolean} */
  closed;

  constructor (agentNetworkInterface) {
    const { feedStore, feed } = agentNetworkInterface;
    assert(feedStore);
    assert(feed);
    this.feedStore = feedStore;
    this.feed = feed;
  }

  /**
   * @return {FeedTestAgent}
   */
  getAgent () {
    return this._agent;
  }

  /**
   * Set this node's associated agent.
   * @param agent {FeedTestAgent}
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

    this.replicator = new DefaultReplicator({
      feedStore: this.feedStore,
      onLoad: () => [this.feed],
      onUnsubscribe: () => {
        this.closed = true;
      }
    });
    log(`Created peer ${humanize(peerId)}`);
  }

  createStream () {
    // TODO(dboreham): We believe that topic is required in init(discoveryKey(this.topic) below.
    // However it appears that even if this.topic is undefined, our tests pass.
    assert(this.topic);
    assert(this.feedStore);
    return new Protocol({
      streamOptions: {
        live: true
      }
    })
      .setSession({ id: 'session1' })
      .setContext({ name: 'foo' })
      .setExtensions([this.replicator.createExtension()])
      .init(discoveryKey(this.topic))
      .stream;
  }

  isClosed () {
    return this.closed;
  }
}
