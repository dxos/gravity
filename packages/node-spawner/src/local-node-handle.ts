import { NodeHandle } from './node-handle';
import { Node } from './node';

export class LocalNodeHandle extends NodeHandle {
  constructor (private readonly _node: Node) {
    super(_node.id);
  }

  send (bytes: Buffer) {
    this._node.handleCommand(bytes);
  }
}
