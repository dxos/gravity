import { Platform, NodeFactory } from './node-factory';
import { combine, sum } from './util';

export class NodeOrchestrator {
  private readonly _factory = new NodeFactory();

  async createNode (agentPath: string, platform: Platform) {
    return await this._factory.createNode({ kind: 'local', path: agentPath }, platform);
  }

  async waitForSync () {
    const nodes = Array.from(this._factory.nodes());

    return combine(nodes.map(node => node.metrics.update)).waitFor(() => {
      const totalAppended = sum(nodes.map(node => node.metrics.getNumber('appended') ?? 0));
      return nodes.every(node => node.metrics.getNumber('updated') == totalAppended);
    });
  }

  destroy () {
    this._factory.destroy();
  }
}
