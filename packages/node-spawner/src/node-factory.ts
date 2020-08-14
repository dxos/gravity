import { Node } from './node';
import { randomBytes } from '@dxos/crypto';
import { LocalNodeHandle } from './local-node-handle';
import { NodeHandle } from './node-handle';

export type PackageSource = {
  kind: 'local',
  path: string,
} | {
  kind: 'ipfs',
  hash: string,
}

export enum Platform {
  IN_PROCESS,
  NODE,
  CHROME,
  FIREFOX,
  SAFARI,
}

export class NodeFactory {
  private _nodes = new Set<NodeHandle>();

  nodes(): Iterable<NodeHandle> {
    return this._nodes;
  }

  async createNode (packageSource: PackageSource, platform: Platform) {
    if (packageSource.kind !== 'local') throw new Error('Only local packages are supported');

    if (platform === Platform.IN_PROCESS) {
      const nodeId = randomBytes();
      let eventHandler: (data: Buffer) => void;
      const node = new Node(
        nodeId,
        packageSource.path,
        (data) => { eventHandler(data); }
      );
      const handle = new LocalNodeHandle(node);
      eventHandler = handle.handleEvent.bind(handle);
      await node.start();
      this._nodes.add(handle);
      return handle;
    } else if (platform === Platform.NODE) {
      throw new Error('Not implemented');
    } else {
      throw new Error(`Unsupported platform: ${Platform[platform]}`);
    }
  }

  destroy () {
    for (const node of this._nodes.values()) {
      node.destroy();
    }
  }
}
