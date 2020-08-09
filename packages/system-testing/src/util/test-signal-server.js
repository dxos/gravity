//
// Copyright 2019 DXOS.org
//

import http from 'http';
import debug from 'debug';

import SignalSwarmServer from '@geut/discovery-swarm-webrtc/server';

const log = debug('test');

export class TestSignalServer {
  _httpServer = null;
  _signalSwarmServer = null;

  async start (options) {
    const { port = 4000 } = options || {};

    this._httpServer = http.createServer((_, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Signal running OK\n');
    });

    // TODO(burdon): Hangs here.
    this._signalSwarmServer = new SignalSwarmServer({ server: this._httpServer });

    return new Promise((resolve, reject) => {
      this._httpServer.on('error', (err) => {
        reject(err);
      });
      this._httpServer.listen(port, () => {
        log('Run discovery-signal-webrtc on port:', port);
        resolve();
      });
    });
  }

  async stop () {
    if (this._httpServer) {
      // TODO(dboreham): add graceful shutdown, wait
      log('Shutdown discovery-signal-webrtc');

      await this._signalSwarmServer.close();
    }
  }
}
