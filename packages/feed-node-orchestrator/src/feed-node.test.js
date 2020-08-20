//
// Copyright 2020 DXOS.org
//

import debug from 'debug';
import waitForExpect from 'wait-for-expect';

import { humanize, createId, keyToBuffer } from '@dxos/crypto';

import { FeedNode } from './feed-node';
import { feedNodeOrchestrator } from './feed-node-orchestrator';
import { TestAgent } from './testing/test-agent';

const log = debug('dxos:feed-replication-orchestrator:test');

const randomMessage = () => {
  return {
    data: createId()
  };
};

const TestAgentFactory = async (topic, peerId) => {
  const agent = new TestAgent();
  await agent.initialize(topic);
  const node = new FeedNode(agent.getNetworkInterface());
  await node.initialize(topic, peerId);
  node.setAgent(agent);
  return node;
};

test('feed-node-network-generated', async () => {
  // with nodes that have one write feed each and
  // expect to replicate all feeds
  // expose a method to post a message on a node's feed
  // expose a method to check if a specific message has been received by any feed read by a node
  // allow other introspection such as check if two nodes are synced with each other

  const orchestrator = await feedNodeOrchestrator({ initializeConnected: false, peerCount: 2 }, TestAgentFactory);

  const peers = orchestrator.peers;
  expect(peers.length).toEqual(2);

  const [peer1, peer2] = peers;
  const agent1 = peer1.getAgent();
  const agent2 = peer2.getAgent();

  log(`Peer1: ${humanize(peer1.id)}`);
  log(`Peer2: ${humanize(peer2.id)}`);

  const message1 = randomMessage();
  const message2 = randomMessage();
  const message3 = randomMessage();
  const message4 = randomMessage();

  // Check replication isn't occurring.

  expect(orchestrator.connections.length).toBe(0);

  await agent1.append(message1);
  await agent2.append(message2);

  await waitForExpect(async () => {
    const peer1Messages = await agent1.getMessages();
    const peer2Messages = await agent2.getMessages();
    expect(peer1Messages).toContainEqual(message1);
    expect(peer2Messages).toContainEqual(message2);
  });

  await waitForExpect(async () => {
    const peer1Messages = await agent1.getMessages();
    const peer2Messages = await agent2.getMessages();
    // Check messages not replicated to opposite peers.
    expect(peer1Messages).not.toContainEqual(message2);
    expect(peer2Messages).not.toContainEqual(message1);
  });

  // Check replication occurs when the peers are connected.

  await orchestrator.addConnection(peer1.id, peer2.id);
  expect(orchestrator.connections.length).toBe(1);

  await waitForExpect(async () => {
    const peer1Messages = await agent1.getMessages();
    const peer2Messages = await agent2.getMessages();
    expect(peer1Messages).toContainEqual(message2);
    expect(peer2Messages).toContainEqual(message1);
  });

  // Check replication stops again if we remove the connection.

  await orchestrator.deleteConnection(peer1.id, peer2.id);
  expect(orchestrator.connections.length).toBe(0);

  await agent1.append(message3);
  await agent2.append(message4);

  await waitForExpect(async () => {
    const peer1Messages = await agent1.getMessages();
    const peer2Messages = await agent2.getMessages();
    expect(peer1Messages).not.toContainEqual(message4);
    expect(peer2Messages).not.toContainEqual(message3);
  });

  // Check replication occurs again if we add the connection again.

  await orchestrator.addConnection(peer1.id, peer2.id);
  expect(orchestrator.connections.length).toBe(1);

  await waitForExpect(async () => {
    log('Getting messages2');
    const peer1Messages = await agent1.getMessages();
    const peer2Messages = await agent2.getMessages();
    expect(peer1Messages).toContainEqual(message4);
    expect(peer2Messages).toContainEqual(message3);
  });
});

test.skip('feed-node-network-explicit', async () => {
  // with nodes that have one write feed each and
  // expect to replicate all feeds
  // expose a method to post a message on a node's feed
  // expose a method to check if a specific message has been received by any feed read by a node
  // allow other introspection such as check if two nodes are synced with each other

  const topic = keyToBuffer(createId());

  const orchestrator = await feedNodeOrchestrator({ initializeConnected: false, peerCount: 0, topic }, TestAgentFactory);

  const createAgentAndNode = async () => {
    const agent = new TestAgent();
    await agent.initialize(topic);
    const node = new FeedNode(agent.getNetworkInterface());
    const peerId = keyToBuffer(createId());
    await node.initialize(topic, peerId);
    node.setAgent(agent);
    return { agent, node };
  };

  const { agent: agent1, node: node1 } = await createAgentAndNode();
  const { agent: agent2, node: node2 } = await createAgentAndNode();

  await orchestrator.insertPeer(node1);
  await orchestrator.insertPeer(node2);

  const peers = orchestrator.peers;
  expect(peers.length).toEqual(2);

  const [peer1, peer2] = peers;

  log(`Peer1: ${humanize(peer1.id)}`);
  log(`Peer2: ${humanize(peer2.id)}`);

  const message1 = randomMessage();
  const message2 = randomMessage();
  const message3 = randomMessage();
  const message4 = randomMessage();

  // Check replication isn't occurring.

  expect(orchestrator.connections.length).toBe(0);

  await agent1.append(message1);
  await agent2.append(message2);

  await waitForExpect(async () => {
    const peer1Messages = await agent1.getMessages();
    const peer2Messages = await agent2.getMessages();
    expect(peer1Messages).toContainEqual(message1);
    expect(peer2Messages).toContainEqual(message2);
  });

  await waitForExpect(async () => {
    const peer1Messages = await agent1.getMessages();
    const peer2Messages = await agent2.getMessages();
    // Check messages not replicated to opposite peers.
    expect(peer1Messages).not.toContainEqual(message2);
    expect(peer2Messages).not.toContainEqual(message1);
  });

  // Check replication occurs when the peers are connected.

  await orchestrator.addConnection(peer1.id, peer2.id);
  expect(orchestrator.connections.length).toBe(1);

  await waitForExpect(async () => {
    const peer1Messages = await agent1.getMessages();
    const peer2Messages = await agent2.getMessages();
    expect(peer1Messages).toContainEqual(message2);
    expect(peer2Messages).toContainEqual(message1);
  });

  // Check replication stops again if we remove the connection.

  await orchestrator.deleteConnection(peer1.id, peer2.id);
  expect(orchestrator.connections.length).toBe(0);

  await agent1.append(message3);
  await agent2.append(message4);

  await waitForExpect(async () => {
    const peer1Messages = await agent1.getMessages();
    const peer2Messages = await agent2.getMessages();
    expect(peer1Messages).not.toContainEqual(message4);
    expect(peer2Messages).not.toContainEqual(message3);
  });

  // Check replication occurs again if we add the connection again.

  await orchestrator.addConnection(peer1.id, peer2.id);
  expect(orchestrator.connections.length).toBe(1);

  await waitForExpect(async () => {
    log('Getting messages2');
    const peer1Messages = await agent1.getMessages();
    const peer2Messages = await agent2.getMessages();
    expect(peer1Messages).toContainEqual(message4);
    expect(peer2Messages).toContainEqual(message3);
  });
});
