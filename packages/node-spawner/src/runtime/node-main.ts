import { Node } from "./node";
import { keyToBuffer } from "@dxos/crypto";
import assert from "assert";

interface Options {
  id: string
  agentPath: string
}

const options: Options = JSON.parse(process.argv[2]);

const node = new Node(
  keyToBuffer(options.id),
  options.agentPath,
  event => process.send!(event),
);

process.on('message', data => {
  assert(data instanceof Buffer);
  node.handleCommand(data)
});

node.start();