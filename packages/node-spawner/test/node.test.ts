import { NodeOrchestrator, Network } from '../src/node-orchestrator';
import { Platform } from '../src/factory/node-factory';

test('fork ClientAgent', async () => {
  const orchestrator = new NodeOrchestrator();

  const node = await orchestrator.createNode(require.resolve('./client-agent'), Platform.NODE);
  node.metrics.update.on(() => console.log(node.metrics.asObject()));

  node.sendEvent({});

  node.snapshot();

  await node.metrics.update.waitFor(() => node.metrics.getNumber('updated') === 1);

  orchestrator.destroy();
});

test('replication', async () => {
  const orchestrator = new NodeOrchestrator();

  const node1 = await orchestrator.createNode(require.resolve('./client-agent'), Platform.NODE, Network.LOCAL_SIGNAL);
  const node2 = await orchestrator.createNode(require.resolve('./client-agent'), Platform.NODE, Network.LOCAL_SIGNAL);
  node1.metrics.update.on(() => console.log(node1.metrics.asObject()));
  node2.metrics.update.on(() => console.log(node2.metrics.asObject()));

  node1.sendEvent({});

  await node1.metrics.update.waitFor(() => node1.metrics.getNumber('updated') === 1);
  console.log('node 1 updated')
  await node2.metrics.update.waitFor(() => node1.metrics.getNumber('updated') === 1);

  node1.snapshot();
  node2.snapshot();

  orchestrator.destroy();
});

