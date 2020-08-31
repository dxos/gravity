import { NodeOrchestrator } from '../src/node-orchestrator';
import { Platform } from '../src/node-factory';

test('fork TestAgent', async () => {
  const orchestrator = new NodeOrchestrator();

  const node = await orchestrator.createNode(require.resolve('./client-agent'), Platform.NODE);
  node.metrics.update.on(() => console.log(node.metrics.asObject()));

  node.sendEvent({});

  node.snapshot();

  await node.metrics.update.waitFor(() => node.metrics.getNumber('updated') === 1)

  orchestrator.destroy();
});
