import { NodeOrchestrator } from '../src/node-orchestrator';
import { Platform } from '../src/node-factory';

test('fork TestAgent', async () => {
  const orchestrator = new NodeOrchestrator();

  const node = await orchestrator.createNode(require.resolve('./test-agent'), Platform.NODE);

  node.sendEvent({});

  node.snapshot();

  orchestrator.destroy();
});
