import { Node } from './node';
import { randomBytes } from '@dxos/crypto';

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
  createNode (packageSource: PackageSource, platform: Platform) {
    if (packageSource.kind !== 'local') throw new Error('Only local packages are supported');
    if (platform !== Platform.IN_PROCESS) throw new Error('Only IN_PROCESS platform is supported');

    const nodeId = randomBytes();
    const node = new Node(
      nodeId,
      packageSource.path,
      (eventName, details) => {
        if (eventName === 'log') {
          console.log(`${nodeId.toString('hex').slice(4)}: ${details.message}`);
        } else {
          console.log(`${nodeId.toString('hex').slice(4)}: ${eventName} ${JSON.stringify(details)}`);
        }
      }
    );
    node.start();
    return node;
  }
}
