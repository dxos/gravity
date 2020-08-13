//
// Copyright 2020 DXOS.org
//

import debug from 'debug';
import waitForExpect from 'wait-for-expect';

import { humanize, createId } from '@dxos/crypto';

import { createReplicationNetwork } from './feed-replication-network';
import { TestReplicationPeerFactory } from './testing/test-feed-peer';

const log = debug('dxos:feed-replication-network:test');

const randomMessage = () => {
  return {
    data: createId()
  };
};

test('DirectedReplicationNetwork', async () => {
  // with nodes that have one write feed each and
  // expect to replicate all feeds
  // expose a method to post a message on a node's feed
  // expose a method to check if a specific message has been received by any feed read by a node
  // allow other introspection such as check if two nodes are synced with each other

  const network = await createReplicationNetwork({ initializeConnected: false, peerCount: 2 }, TestReplicationPeerFactory);

  const peers = network.peers;
  expect(peers.length).toEqual(2);

  const [peer1, peer2] = peers;

  log(`Peer1: ${humanize(peer1.id)}`);
  log(`Peer2: ${humanize(peer2.id)}`);

  const message1 = randomMessage();
  const message2 = randomMessage();
  const message3 = randomMessage();
  const message4 = randomMessage();

  // Check replication isn't occurring.

  expect(network.connections.length).toBe(0);

  await peer1.append(message1);
  await peer2.append(message2);

  await waitForExpect(async () => {
    const peer1Messages = await peer1.getMessages();
    const peer2Messages = await peer2.getMessages();
    expect(peer1Messages).toContainEqual(message1);
    expect(peer2Messages).toContainEqual(message2);
  });

  await waitForExpect(async () => {
    const peer1Messages = await peer1.getMessages();
    const peer2Messages = await peer2.getMessages();
    // Check messages not replicated to opposite peers.
    expect(peer1Messages).not.toContainEqual(message2);
    expect(peer2Messages).not.toContainEqual(message1);
  });

  // Check replication occurs when the peers are connected.

  await network.addConnection(peer1.id, peer2.id);
  expect(network.connections.length).toBe(1);

  await waitForExpect(async () => {
    const peer1Messages = await peer1.getMessages();
    const peer2Messages = await peer2.getMessages();
    expect(peer1Messages).toContainEqual(message2);
    expect(peer2Messages).toContainEqual(message1);
  });

  // Check replication stops again if we remove the connection.

  await network.deleteConnection(peer1.id, peer2.id);
  expect(network.connections.length).toBe(0);

  await peer1.append(message3);
  await peer2.append(message4);

  await waitForExpect(async () => {
    const peer1Messages = await peer1.getMessages();
    const peer2Messages = await peer2.getMessages();
    expect(peer1Messages).not.toContainEqual(message4);
    expect(peer2Messages).not.toContainEqual(message3);
  });

  // Check replication occurs again if we add the connection again.

  await network.addConnection(peer1.id, peer2.id);
  expect(network.connections.length).toBe(1);

  await waitForExpect(async () => {
    log('Getting messages2');
    const peer1Messages = await peer1.getMessages();
    const peer2Messages = await peer2.getMessages();
    expect(peer1Messages).toContainEqual(message4);
    expect(peer2Messages).toContainEqual(message3);
  });
});
