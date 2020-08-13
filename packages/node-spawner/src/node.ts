import { JsonObject } from './common';
import { Agent } from './agent';
import assert from 'assert';

export interface Environment {
  log: (eventName: string, details: JsonObject) => void;
  logMessage: (...args: any[]) => void;
}

export class Node {
  private _agent: Agent | undefined;

  constructor (
    private readonly _id: Buffer,
    private readonly _agentPath: string,
    private readonly _onLog: (eventName: string, details: JsonObject) => void
  ) {}

  private _log (eventName: string, details: JsonObject) {
    this._onLog(eventName, details);
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

  sendEvent (event: JsonObject) {
    assert(this._agent);
    this._agent.onEvent(event);
  }

  snapshot (): JsonObject {
    assert(this._agent);
    return this._agent.snapshot();
  }
}

function requireAgent (path: string) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const agentModule = require(path);
  return agentModule.__esModule ? agentModule.default : agentModule;
}
