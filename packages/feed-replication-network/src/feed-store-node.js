//
// Copyright 2020 DXOS.org
//

import assert from 'assert';
import debug from 'debug';

import { discoveryKey, humanize } from '@dxos/crypto';
import { Protocol } from '@dxos/protocol';
import { DefaultReplicator } from '@dxos/protocol-plugin-replicator';

const log = debug('dxos:feed-store-node');

export class FeedStoreNode {
  // TODO(dboreham): Do we need getters/private member pattern here?
  /** @type {Key} */
  id;

  /** @type {Key} */
  _topic;

  /** @type {FeedStore} */
  _feedStore;

  /** @type {Feed} */
  _feed;

  /** @type {ProtocolExtension} */
  _replicator;

  /** @type {Boolean} */
  _closed;

  /**
   *
   * @param topic {Key}
   * @param peerId {Key}
   * @param feedStore {FeedStore}
   * @param feed {Feed}
   * @returns {Promise<FeedReplicationPeer>}
   */
  constructor (topic, peerId, feedStore, feed) {
    this.id = peerId;
    this._topic = topic;
    this._feedStore = feedStore;
    this._feed = feed;
    this._closed = false;
  }

  async initialize () {
    this._replicator = new DefaultReplicator({
      feedStore: this._feedStore,
      onLoad: () => [this._feed],
      onUnsubscribe: () => {
        this.closed = true;
      }
    });
    log(`Created feed-store-node ${humanize(this.id)}`);
  }

  createStream () {
    // TODO(dboreham): We believe that topic is required in init(discoveryKey(this.topic) below.
    // However it appears that even if this.topic is undefined, our tests pass.
    assert(this._topic);
    assert(this._feedStore);
    return new Protocol({
      streamOptions: {
        live: true
      }
    })
      .setSession({ id: 'session1' })
      .setContext({ name: 'foo' })
      .setExtensions([this._replicator.createExtension()])
      .init(discoveryKey(this._topic))
      .stream;
  }

  isClosed () {
    return this._closed;
  }
}
