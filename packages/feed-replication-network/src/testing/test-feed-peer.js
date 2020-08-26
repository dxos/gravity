//
// Copyright 2020 DXOS.org
//

import debug from 'debug';
import eos from 'end-of-stream';

import { FeedReplicationPeer } from '../feed-replication-peer';

const log = debug('dxos:feed-replication-network');

export class TestFeedPeer extends FeedReplicationPeer {
  async append (msg) {
    return this.feed.append(msg);
  }

  async getMessages () {
    const messages = [];
    const stream = this.feedStore.createReadStream();
    stream.on('data', (data) => {
      log(`Subscription message: ${JSON.stringify(data)}`);
      messages.push(data);
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

export const TestReplicationPeerFactory = async (topic, peerId) => {
  const result = new TestFeedPeer();
  await result.initialize(topic, peerId);
  return result;
};
