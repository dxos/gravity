//
// Copyright 2020 DXOS.org
//

import hrtime from 'browser-process-hrtime';
import prettyHrtime from 'pretty-hrtime';
import { join } from 'path';

import DefaultAgentClass from './agents';
import { createRPC } from './create-rpc';

(async () => {
  try {
    const rpc = createRPC(typeof window !== 'undefined' && window.process ? window.process : process);

    const errors = [];
    process.on('unhandledRejection', (err) => {
      errors.push(err);
    });

    process.on('uncaughtException', (err) => {
      errors.push(err);
    });

    let agent;

    const startTime = hrtime();

    await rpc
      .actions({
        ping: () => 'pong',
        init: async (opts) => {
          console.log(opts);
          const AgentClass = opts.agent && !opts.browser ? require(join(process.cwd(), opts.agent)) : DefaultAgentClass;
          agent = new AgentClass();
          await agent.init(opts);

          agent.on('party-update', (partyInfo) => {
            rpc.emit('party-update', partyInfo);
          });

          agent.on('model-update', data => {
            rpc.emit('model-update', data);
          });

          return { publicKey: agent.identityPublicKey };
        },
        createParty: () => agent.createParty(),
        createInvitation: ({ publicKey }) => agent.createInvitation(publicKey),
        joinParty: ({ invitation }) => agent.joinParty(invitation),
        initAgent: () => agent.initAgent(),
        getModelObjects: () => agent.getModelObjects(),
        tick: (opts) => agent.tick(opts),
        getState: () => {
          const state = agent.state;

          const liveTime = hrtime(startTime);

          return {
            clientId: agent.identityPublicKey.toString('hex').slice(0, 6),
            liveTimeFormat: `~${prettyHrtime(liveTime)} (${liveTime[0]} s + ${liveTime[1]} ns)`,
            liveTime,
            agent: state,
            unhandledErrors: errors
          };
        }
      })
      .open();

    rpc.emit('agent-ready');
  } catch (err) {
    console.log(err);
  }
})();
