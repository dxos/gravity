import { Platform, NodeFactory } from './node-factory';

export class NodeOrchestrator {
  private readonly _factory = new NodeFactory();

  createNode (agentPath: string, platform: Platform) {
    return this._factory.createNode({ kind: 'local', path: agentPath }, platform);
  }
}
