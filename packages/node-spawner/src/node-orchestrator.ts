import { Platform, NodeFactory } from './node-factory';
import { combine, sum } from './util';

/**
 * Provides methods to spawn agents either locally or on the remote machine.
 * Can verify their state as well as check that the network is replicated.
 */
export class NodeOrchestrator {
  private readonly _factory = new NodeFactory();

  /**
   * Create a node with the specified agents.
   *
   * Agents are assumed to be in a file that default-exports the class that implements the `Agent` interface.
   * Agents take an `Environment` object as the constructor parameter.
   *
   * Look at "test/client-agent.ts" for examples.
   *
   * @param agentPath Path to the agent module
   * @param platform
   */
  async createNode (agentPath: string, platform: Platform) {
    return this._factory.createNode({ kind: 'local', path: agentPath }, platform);
  }

  async waitForSync () {
    const nodes = Array.from(this._factory.nodes());

    return combine(nodes.map(node => node.metrics.update)).waitFor(() => {
      const totalAppended = sum(nodes.map(node => node.metrics.getNumber('appended') ?? 0));
      return nodes.every(node => node.metrics.getNumber('updated') === totalAppended);
    });
  }

  destroy () {
    this._factory.destroy();
  }
}
