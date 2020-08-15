//
// Copyright 2020 DXOS.org
//

import debug from 'debug';
import eos from 'end-of-stream';

import { FeedStore } from '@dxos/feed-store';
import ram from 'random-access-memory';

const log = debug('dxos:feed-store-network');

export class TestAgent {
  /** @type {FeedStore} */
  _feedStore;

  /** @type {Feed} */
  _feed;

  /**
   * Method required to be an agent in the test network
   * @returns {{feed: Feed, feedStore: FeedStore}}
   */
  getNetworkInterface () {
    return { feedStore: this._feedStore, feed: this._feed };
  }

  // Agent's own interface (unrelated to test network participation):

  async initialize (topic) {
    // TODO(dboreham): Allow specification of storage type and encoding.
    this._feedStore = await FeedStore.create(ram, { feedOptions: { valueEncoding: 'json' } });
    this._feed = await this._feedStore.openFeed('/feed', { metadata: { topic: topic.toString('hex') } });
  }

  async append (msg) {
    return this._feed.append(msg);
  }

  async getMessages () {
    const messages = [];
    const stream = this._feedStore.createReadStream();
    stream.on('data', (data) => {
      log(`Subscription message: ${JSON.stringify(data)}`);
      messages.push(data.data);
    });
    return new Promise((resolve, reject) => {
      eos(stream, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(messages);
        }
      });
    });
  }
}
