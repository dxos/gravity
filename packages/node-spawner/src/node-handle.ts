import { JsonObject } from './common';
import { Codec } from '@dxos/codec-protobuf';
import ProtoJSON from './proto/gen/node.json';
import { dxos } from './proto/gen/node';

const codec = new Codec('dxos.node.NodeCommand')
  .addJson(ProtoJSON)
  .build();

export abstract class NodeHandle {
  constructor (private readonly _nodeId: Buffer) {}

  sendEvent (event: JsonObject) {
    const command: dxos.node.INodeCommand = {
      event: {
        event: JSON.stringify(event)
      }
    };
    this.send(codec.encodeByType(command, 'dxos.node.NodeCommand'));
  }

  snapshot () {
    const command: dxos.node.INodeCommand = {
      snapshot: {}
    };
    this.send(codec.encodeByType(command, 'dxos.node.NodeCommand'));
  }

  destroy() {
    const command: dxos.node.INodeCommand = {
      destroy: {}
    };
    this.send(codec.encodeByType(command, 'dxos.node.NodeCommand'));
  }

  protected abstract send(command: Buffer): void;

  handleEvent (data: Buffer) {
    const event = codec.decodeByType(data, 'dxos.node.NodeEvent') as dxos.node.INodeEvent;
    if (event.log) {
      const { eventName, details } = event.log;
      if (eventName === 'log') {
        console.log(`${this._nodeId.toString('hex').slice(4)}: ${JSON.parse(details!).message}`);
      } else {
        console.log(`${this._nodeId.toString('hex').slice(4)}: ${eventName} ${details}`);
      }
    } else if (event.snapshot) {
      console.log(`${this._nodeId.toString('hex').slice(4)}: snapshot ${event.snapshot.data}`);
    }
  }
}
