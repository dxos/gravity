import { NodeHandle } from "./node-handle";
import { ChildProcess } from "child_process";

export class ForkNodeHandle extends NodeHandle {
  constructor (
    nodeId: Buffer,
    private readonly _process: ChildProcess,
  ) {
    super(nodeId);
  }

  protected send(command: Buffer): void {
    this._process.send(command);
  }
}