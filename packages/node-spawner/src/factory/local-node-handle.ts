import { NodeHandle } from './node-handle';
import { Node } from '../runtime/node';

/**
 * Handle for the node running in the same process.
 */
export class LocalNodeHandle extends NodeHandle {
  constructor (private readonly _node: Node) {
    super(_node.id);
  }

  send (bytes: Buffer) {
    this._node.handleCommand(bytes);
  }
}
