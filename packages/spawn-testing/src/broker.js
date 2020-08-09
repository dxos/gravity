//
// Copyright 2020 DXOS.org
//

import path from 'path';
import execa from 'execa';
import debug from 'debug';
import pEvent from 'p-event';
import { run as runInBrowser } from '@dxos/browser-runner';

import { createRPC } from './create-rpc';

const signalLog = debug('dxos:spawn-testing:signal');
const peerLog = debug('dxos:spawn-testing:peer');

function spawn (command, args = []) {
  const child = execa(command, args, {
    serialization: 'advanced',
    preferLocal: true
  });

  child.stdout.on('data', data => {
    signalLog(data.toString());
  });

  child.stderr.on('data', data => {
    signalLog(data.toString());
  });

  return child;
}

function fork (file, args = []) {
  const child = execa.node(file, args, {
    serialization: 'advanced',
    preferLocal: true
  });

  child.stdout.on('data', data => {
    peerLog(data.toString());
  });

  child.stderr.on('data', data => {
    peerLog(data.toString());
  });

  return child;
}

export class Broker {
  constructor () {
    this._signal = null;
    this._peers = new Map();
  }

  get peers () {
    return Array.from(this._peers.values());
  }

  createSignal (opts = {}) {
    const { port = 4000 } = opts;
    this._signal = spawn('discovery-swarm-webrtc', ['--port', port]);
    return pEvent(this._signal.stdout, 'data', {
      filter (data) {
        return data.toString().includes('discovery-swarm-webrtc running');
      }
    });
  }

  async createPeer ({ agent, storage, browser = false, puppeteerOptions = {} } = {}) {
    const start = Date.now();
    const scriptPath = path.resolve(path.join(__dirname, 'peer.js'));
    const child = browser
      ? await runInBrowser({ src: scriptPath, alias: agent && [`./agents:${agent}`], timeout: 0, log: peerLog, puppeteerOptions, processExit: false })
      : fork(scriptPath, agent && ['--agent', agent]);

    const rpc = createRPC(child);
    await rpc.open();
    await rpc.once('agent-ready');
    const { publicKey } = await rpc.call('init', { storage, agent, browser });
    this._peers.set(publicKey.toString('hex'), rpc);
    peerLog(`Peer started in ${Date.now() - start} ms`);
    return rpc;
  }

  async watch (client, event, condition) {
    for await (const result of client.events(event)) {
      if (condition && condition(result)) {
        break;
      }
    }
  }

  async getStats () {
    const statsByPeer = {};
    await Promise.all(Array.from(this._peers.keys()).map(async peerId => {
      const peer = this._peers.get(peerId);
      const stats = await peer.call('stats');
      statsByPeer[peerId] = stats;
    }));
    return statsByPeer;
  }

  async destroy () {
    process.nextTick(() => this._signal.cancel());
    await this._signal.catch(() => {});
    await Promise.all(this.peers.map(peer => peer.close()));
  }
}
