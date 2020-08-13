import { JsonObject } from './common';
import { Agent } from './agent';
import assert from 'assert';
import { Codec } from '@dxos/codec-protobuf';
import ProtoJSON from './proto/gen/node.json';
import { dxos } from './proto/gen/node';

export interface Environment {
  log: (eventName: string, details: JsonObject) => void;
  logMessage: (...args: any[]) => void;
}

const codec = new Codec('dxos.node.NodeCommand')
  .addJson(ProtoJSON)
  .build();

export class Node {
  private _agent: Agent | undefined;

  constructor (
    public readonly id: Buffer,
    private readonly _agentPath: string,
    private readonly _onEvent: (event: Buffer) => void
  ) {}

  private _log (eventName: string, details: JsonObject) {
    this._reportEvent({
      log: {
        eventName,
        details: JSON.stringify(details)
      }
    });
  }

  private _logMessage (...args: any[]) {
    this._log('log', {
      message: args.map(arg => arg.toString()).join(' ') // TODO(marik-d): Better stringification algorithm
    });
  }

  start () {
    const AgentClass = requireAgent(this._agentPath);
    const environment: Environment = {
      log: this._log.bind(this),
      logMessage: this._logMessage.bind(this)
    };

    this._agent = new AgentClass(environment);
  }

  handleCommand (commandBuffer: Buffer) {
    const command = codec.decodeByType(commandBuffer, 'dxos.node.NodeCommand') as dxos.node.INodeCommand;
    if (command.event) {
      assert(command.event!.event);
      this._sendEvent(JSON.parse(command.event.event));
    } else if (command.snapshot) {
      this._snapshot();
    }
  }

  private _reportEvent (event: dxos.node.INodeEvent) {
    const bytes = codec.encodeByType(event, 'dxos.node.NodeEvent');
    this._onEvent(bytes);
  }

  private _sendEvent (event: JsonObject) {
    assert(this._agent);
    this._agent.onEvent(event);
  }

  private _snapshot () {
    assert(this._agent);
    const snapshot = this._agent.snapshot();
    this._reportEvent({
      snapshot: {
        data: JSON.stringify(snapshot)
      }
    });
  }
}

function requireAgent (path: string) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const agentModule = require(path);
  return agentModule.__esModule ? agentModule.default : agentModule;
}
