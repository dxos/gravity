import { sleep } from '@dxos/async';
import { NodeOrchestrator } from '../src/node-orchestrator';
import { Platform } from '../src/node-factory';

test('in-process TestAgent', async () => {
  const orchestrator = new NodeOrchestrator();

  const node = await orchestrator.createNode(require.resolve('./test-agent'), Platform.IN_PROCESS);

  node.sendEvent({});

  node.snapshot();

  orchestrator.destroy();
});

test('in-process ClientAgent', async () => {
  const orchestrator = new NodeOrchestrator();

  const node1 = await orchestrator.createNode(require.resolve('./client-agent'), Platform.IN_PROCESS);
  const node2 = await orchestrator.createNode(require.resolve('./client-agent'), Platform.IN_PROCESS);
  node1.metrics.update.on(() => console.log(node1.metrics.asObject()));
  node2.metrics.update.on(() => console.log(node2.metrics.asObject()));

  node1.sendEvent({});

  await orchestrator.waitForSync();

  node1.snapshot();
  node2.snapshot();

  orchestrator.destroy();
});
