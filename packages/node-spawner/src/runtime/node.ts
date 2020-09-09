import memdown from 'memdown';
import { KeyStore } from '@dxos/credentials';
import { randomBytes } from '@dxos/crypto';
import { createStorage } from '@dxos/random-access-multi-storage';
import { SwarmProvider } from '@dxos/network-manager';

import { JsonObject } from '../common';
import { Agent } from './agent';
import assert from 'assert';
import { Codec } from '@dxos/codec-protobuf';
import ProtoJSON from '../proto/gen/node.json';
import { dxos } from '../proto/gen/node';
import { Metrics } from '../metrics';
import { Spec } from './spec';

export interface Environment {
  log: (eventName: string, details: JsonObject) => void;
  logMessage: (...args: any[]) => void;
  keyStore: any, // TODO(marik-d): Type those better
  storage: any,
  swarmProvider: any,
  metrics: Metrics,
}

const codec = new Codec('dxos.node.NodeCommand')
  .addJson(ProtoJSON)
  .build();

/**
 * Agent runtime. Prepares the environment and instantiates an Agent class.
 * Decodes commands and forwards them to the Agent.
 * Sends agent's events to the orchestrator.
 */
export class Node {
  private _agent: Agent | undefined;

  private _metrics = new Metrics();

  constructor (
    public readonly id: Buffer,
    private readonly _agentPath: string,
    private readonly _onEvent: (event: Buffer) => void,
    private readonly _spec: Spec = {},
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

  async start () {
    const AgentClass = requireAgent(this._agentPath);
    const environment: Environment = {
      log: this._log.bind(this),
      logMessage: this._logMessage.bind(this),
      keyStore: new KeyStore(memdown()),
      storage: createStorage(`.temp/${randomBytes(32).toString('hex')}`),
      swarmProvider: new SwarmProvider(this._spec.signal),
      metrics: this._metrics
    };

    this._metrics.update.on(update => {
      this._reportEvent({
        metricsUpdate: update
      });
    });

    this._agent = new AgentClass(environment);

    await this._agent!.init();

    this._reportEvent({
      ready: {}
    });
  }

  handleCommand (commandBuffer: Buffer) {
    const command = codec.decodeByType(commandBuffer, 'dxos.node.NodeCommand') as dxos.node.INodeCommand;
    if (command.event) {
      assert(command.event!.event);
      this._sendEvent(JSON.parse(command.event.event));
    } else if (command.snapshot) {
      this._snapshot();
    } else if (command.destroy) {
      this._destory();
    } else if (command.createParty) {
      assert(this._agent);
      this._agent.createParty?.().then(
        partyKey => this._reportEvent({
          partyCreated: { partyKey }
        }),
        console.error, // TODO(marik-d): Better error reporting
      );
    } else if (command.createInvitation) {
      assert(this._agent);
      this._agent.createInvitation?.(command.createInvitation.partyKey).then(
        invitation => this._reportEvent({
          invitationCreated: { 
            data: JSON.stringify(invitation),
            partyKey: command.createInvitation!.partyKey,
          }
        }),
        console.error, // TODO(marik-d): Better error reporting
      );
    } else if (command.joinParty) {
      assert(this._agent);
      this._agent.joinParty?.(command.joinParty.partyKey, JSON.parse(command.joinParty.invitation)).then(
        response => this._reportEvent({
          invitationAccepted: { 
            partyKey: command.joinParty!.partyKey,
            response: response ? JSON.stringify(response) : undefined,
          }
        }),
        console.error, // TODO(marik-d): Better error reporting
      );
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
    this._agent.snapshot().then(
      snapshot => {
        this._reportEvent({
          snapshot: {
            data: JSON.stringify(snapshot)
          }
        });
      },
      console.error // TODO(marik-d): Better error reporting
    );
  }

  private _destory () {
    setTimeout(() => this._agent?.destroy(), 0);
  }
}

function requireAgent (path: string) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const agentModule = require(path);
  return agentModule.__esModule ? agentModule.default : agentModule;
}
