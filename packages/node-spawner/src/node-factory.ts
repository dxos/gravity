import { Node } from './node';
import { randomBytes, keyToString } from '@dxos/crypto';
import { LocalNodeHandle } from './local-node-handle';
import { NodeHandle } from './node-handle';
import { fork } from 'child_process';
import { ForkNodeHandle } from './fork-node-handle';
import assert from 'assert'

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

/**
 * Factory for spawning and destroying nodes.
 */
export class NodeFactory {
  private _nodes = new Set<NodeHandle>();

  nodes (): Iterable<NodeHandle> {
    return this._nodes;
  }

  async createNode (packageSource: PackageSource, platform: Platform) {
    if (packageSource.kind !== 'local') throw new Error('Only local packages are supported');

    switch (platform) {
      case Platform.IN_PROCESS: {
        const nodeId = randomBytes();
        // eslint-disable-next-line prefer-const
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
      }
      case Platform.NODE: {
        const nodeId = randomBytes();
        const child = fork(require.resolve('./node-main'), [JSON.stringify({ 
          id: keyToString(nodeId),
          agentPath: packageSource.path,
        })], { 
          execArgv: ['-r', 'ts-node/register'],
          env: {
            'TS_NODE_FILES': 'true',
            'TS_NODE_PROJECT': require.resolve('../tsconfig.json')
          },
          serialization: 'advanced'
        });
        const handle = new ForkNodeHandle(nodeId, child);
        child.on('message', data => {
          assert(data instanceof Buffer)
          handle.handleEvent(data)
        })
        this._nodes.add(handle);
        return handle;
      }
      default:
        throw new Error(`Unsupported platform: ${Platform[platform]}`);
    }
  }

  destroy () {
    for (const node of this._nodes.values()) {
      node.destroy();
    }
  }
}
