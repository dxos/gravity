import { Node } from "./node";
import { keyToBuffer } from "@dxos/crypto";

interface Options {
  nodeId: string
  agentPath: string
}

const options: Options = JSON.parse(process.argv[2]);

const node = new Node(
  keyToBuffer(options.nodeId),
  options.agentPath,
  event => console.log(event),
);

node.start();