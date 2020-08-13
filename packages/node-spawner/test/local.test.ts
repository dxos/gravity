import { NodeOrchestrator } from '../src/node-orchestrator';
import { Platform } from '../src/node-factory';

test('in-process TestAgent', () => {
  const orchestrator = new NodeOrchestrator();

  const node = orchestrator.createNode(require.resolve('./test-agent'), Platform.IN_PROCESS);

  node.sendEvent({});

  console.log(node.snapshot());
});
