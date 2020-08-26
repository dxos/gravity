import { JsonObject } from './common';
import { Codec } from '@dxos/codec-protobuf';
import ProtoJSON from './proto/gen/node.json';
import { dxos } from './proto/gen/node';
import { Metrics } from './metrics';
import { Event } from '@dxos/async';

const codec = new Codec('dxos.node.NodeCommand')
  .addJson(ProtoJSON)
  .build();

export interface AgentLog {
  name: string
  details: JsonObject
}

export abstract class NodeHandle {
  readonly metrics = new Metrics();

  readonly log = new Event<AgentLog>()

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

  destroy () {
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
        this.log.emit({ name: eventName!, details: JSON.parse(details!) })
      }
    } else if (event.snapshot) {
      console.log(`${this._nodeId.toString('hex').slice(4)}: snapshot ${event.snapshot.data}`);
    } else if (event.metricsUpdate) {
      this.metrics.applyUpdate(event.metricsUpdate);
    } 
  }
}
