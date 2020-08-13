//
// Copyright 2020 DXOS.org
//

import debug from 'debug';
import ram from 'random-access-memory';
import waitForExpect from 'wait-for-expect';

import { humanize, createId, keyToString } from '@dxos/crypto';
import { FeedStore } from '@dxos/feed-store';

import { createReplicationNetwork } from './feed-replication-network';
import { FeedStoreNode } from './feed-store-node';
import eos from 'end-of-stream';

const log = debug('dxos:feed-store-node:test');

const randomMessage = () => {
  return {
    data: createId()
  };
};

/**
 * Minimal example Node usable for network simulation.
 */
class TestNode {
  // To participate in network simulation node needs to have a FeedStore and also one writable Feed.
  _feedStore;
  _feed;
  _id;

  /**
   * Accessor required to support test networking.
   * @returns {{feed: *, feedStore: *}}
   */
  getNetworkInterface () {
    return { feedStore: this._feedStore, feed: this._feed };
  }

  // Next three methods implement TestNode's functionality. Unrelated to network simulation.

  async initialize (topic, id) {
    this._feedStore = await FeedStore.create(ram, { feedOptions: { valueEncoding: 'json' } });
    this._feed = await this._feedStore.openFeed('/feed', { metadata: { topic: topic.toString('hex') } });
    this._id = keyToString(id);
  }

  async append (msg) {
    return this._feed.append(msg);
  }

  async getMessages () {
    const messages = [];
    const stream = this._feedStore.createReadStream();
    stream.on('data', (data) => {
      // log(`${this._id} Subscription message: ${JSON.stringify(data)}`);
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

const TestPeerFactory = async (topic, peerId) => {
  const testNode = new TestNode();
  await testNode.initialize(topic, peerId);
  const networkInterface = testNode.getNetworkInterface();
  const feedStoreNode = new FeedStoreNode(topic, peerId, networkInterface.feedStore, networkInterface.feed);
  await feedStoreNode.initialize();
  feedStoreNode.testNode = testNode;
  return feedStoreNode;
};

test('DirectedReplicationNetwork', async () => {
  // with nodes that have one write feed each and
  // expect to replicate all feeds
  // expose a method to post a message on a node's feed
  // expose a method to check if a specific message has been received by any feed read by a node
  // allow other introspection such as check if two nodes are synced with each other

  const network = await createReplicationNetwork({ initializeConnected: false, peerCount: 2 }, TestPeerFactory);

  const peers = network.peers;
  expect(peers.length).toEqual(2);

  const [feedStoreNode1, feedStoreNode2] = peers;
  const testNode1 = feedStoreNode1.testNode;
  const testNode2 = feedStoreNode2.testNode;

  log(`testNode1: ${humanize(feedStoreNode1.id)}`);
  log(`testNode2: ${humanize(feedStoreNode2.id)}`);

  const message1 = randomMessage();
  const message2 = randomMessage();
  const message3 = randomMessage();
  const message4 = randomMessage();

  // Check replication isn't occurring.

  expect(network.connections.length).toBe(0);

  await testNode1.append(message1);
  await testNode2.append(message2);

  await waitForExpect(async () => {
    const peer1Messages = await testNode1.getMessages();
    const peer2Messages = await testNode2.getMessages();
    expect(peer1Messages).toContainEqual(message1);
    expect(peer2Messages).toContainEqual(message2);
  });

  await waitForExpect(async () => {
    const peer1Messages = await testNode1.getMessages();
    const peer2Messages = await testNode2.getMessages();
    // Check messages not replicated to opposite peers.
    expect(peer1Messages).not.toContainEqual(message2);
    expect(peer2Messages).not.toContainEqual(message1);
  });

  // Check replication occurs when the peers are connected.

  await network.addConnection(feedStoreNode1.id, feedStoreNode1.id);
  expect(network.connections.length).toBe(1);

  await waitForExpect(async () => {
    const peer1Messages = await testNode1.getMessages();
    const peer2Messages = await testNode2.getMessages();
    expect(peer1Messages).toContainEqual(message2);
    expect(peer2Messages).toContainEqual(message1);
  });

  // Check replication stops again if we remove the connection.

  await network.deleteConnection(feedStoreNode1.id, feedStoreNode1.id);
  expect(network.connections.length).toBe(0);

  await testNode1.append(message3);
  await testNode2.append(message4);

  await waitForExpect(async () => {
    const peer1Messages = await testNode1.getMessages();
    const peer2Messages = await testNode2.getMessages();
    expect(peer1Messages).not.toContainEqual(message4);
    expect(peer2Messages).not.toContainEqual(message3);
  });

  // Check replication occurs again if we add the connection again.

  await network.addConnection(feedStoreNode1.id, feedStoreNode1.id);
  expect(network.connections.length).toBe(1);

  await waitForExpect(async () => {
    log('Getting messages2');
    const peer1Messages = await testNode1.getMessages();
    const peer2Messages = await testNode2.getMessages();
    expect(peer1Messages).toContainEqual(message4);
    expect(peer2Messages).toContainEqual(message3);
  });
});
