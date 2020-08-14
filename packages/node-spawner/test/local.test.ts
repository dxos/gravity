import { sleep } from '@dxos/async';
import { NodeOrchestrator } from '../src/node-orchestrator';
import { Platform } from '../src/node-factory';

test('in-process TestAgent', async () => {
  const orchestrator = new NodeOrchestrator();

  const node = await orchestrator.createNode(require.resolve('./test-agent'), Platform.IN_PROCESS);

  node.sendEvent({});

  node.snapshot();
});

test('in-process ClientAgent', async () => {
  const orchestrator = new NodeOrchestrator();

  const node = await orchestrator.createNode(require.resolve('./client-agent'), Platform.IN_PROCESS);

  node.sendEvent({});

  await sleep(500); // TODO(marik-d): Wait for sync

  node.snapshot();
});
