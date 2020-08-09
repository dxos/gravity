//
// Copyright 2020 DXOS.org
//

import { Duplex } from 'streamx';
import nanomessagerpc from 'nanomessage-rpc';

export function createRPC (ipc) {
  const stream = new Duplex({
    write (data, cb) {
      const kbLength = data.length / 1024;
      if (kbLength > 8) {
        console.log('The payload to send through IPC must be <= 8kb', kbLength);
      }
      ipc.send(data);
      cb(null);
    },
    destroy (cb) {
      if (ipc.killed || !ipc.cancel) {
        return cb();
      }

      process.nextTick(() => ipc.cancel());

      if (ipc.finally) {
        ipc.catch((err) => {
          if (!err.isCanceled) {
            throw err;
          }
        }).finally(cb);
      } else {
        ipc.once('close', cb);
      }
    }
  });

  ipc.once('close', () => {
    if (!stream.destroyed) {
      stream.destroy();
    }
  });

  ipc.on('message', data => {
    stream.push(data);
  });

  return nanomessagerpc(stream, {
    // timeout: Infinity
  });
}
