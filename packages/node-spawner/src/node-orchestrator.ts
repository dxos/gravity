import { Platform, NodeFactory } from './factory/node-factory';
import { combine, sum } from './util';
import { ChildProcess } from 'child_process';
import { startSignal } from './signal';

export enum Network {
  IN_MEMORY,
  LOCAL_SIGNAL,
}

const SIGNAL_PORT = 4001;

/**
 * Provides methods to spawn agents either locally or on the remote machine.
 * Can verify their state as well as check that the network is replicated.
 */
export class NodeOrchestrator {
  private readonly _factory = new NodeFactory();

  private _signal?: ChildProcess;

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
  async createNode (agentPath: string, platform: Platform, network = Network.IN_MEMORY) {
    if(network === Network.LOCAL_SIGNAL && this._signal === undefined) {
      this._signal = await startSignal(SIGNAL_PORT);
    }
    return this._factory.createNode({ kind: 'local', path: agentPath }, platform, {
      signal: network === Network.LOCAL_SIGNAL ? `ws://localhost:${SIGNAL_PORT}` : undefined,
    });
  }

  async waitForSync () {
    const nodes = Array.from(this._factory.nodes());

    return combine(nodes.map(node => node.metrics.update)).waitFor(() => {
      const totalAppended = sum(nodes.map(node => node.metrics.getNumber('appended') ?? 0));
      return nodes.every(node => node.metrics.getNumber('updated') === totalAppended);
    });
  }

  destroy () {
    if(this._signal) {
      this._signal.kill();
    }
    this._factory.destroy();
  }
}
