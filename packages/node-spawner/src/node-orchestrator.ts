import { Platform, NodeFactory } from './node-factory';

export class NodeOrchestrator {
  private readonly _factory = new NodeFactory();

  async createNode (agentPath: string, platform: Platform) {
    return await this._factory.createNode({ kind: 'local', path: agentPath }, platform);
  }

  destroy () {
    this._factory.destroy();
  }
}
