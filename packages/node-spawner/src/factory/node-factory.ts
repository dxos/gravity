import { Node } from '../runtime/node';
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
      case Platform.IN_PROCESS: return this._spawnLocal(packageSource.path);
      case Platform.NODE: return this._spawnFork(packageSource.path);
      default: throw new Error(`Unsupported platform: ${Platform[platform]}`);
    }
  }

  private async _spawnLocal(path: string) {
    const nodeId = randomBytes();
    // eslint-disable-next-line prefer-const
    let eventHandler: (data: Buffer) => void;
    const node = new Node(
      nodeId,
      path,
      (data) => { eventHandler(data); }
    );
    const handle = new LocalNodeHandle(node);
    eventHandler = handle.handleEvent.bind(handle);
    await node.start();
    this._nodes.add(handle);
    return handle;
  }

  private async _spawnFork(path: string) {
    const nodeId = randomBytes();
    const child = fork(require.resolve('../runtime/node-main'), [JSON.stringify({ 
      id: keyToString(nodeId),
      agentPath: path,
    })], { 
      execArgv: ['-r', 'ts-node/register'],
      env: {
        'TS_NODE_FILES': 'true',
        'TS_NODE_PROJECT': require.resolve('../../tsconfig.json')
      },
      serialization: 'advanced'
    });
    const handle = new ForkNodeHandle(nodeId, child);
    child.on('message', data => {
      assert(data instanceof Buffer)
      handle.handleEvent(data)
    })
    this._nodes.add(handle);
    await handle.ready.waitForCount(1);
    return handle;
  }

  destroy () {
    for (const node of this._nodes.values()) {
      node.destroy();
    }
  }
}
