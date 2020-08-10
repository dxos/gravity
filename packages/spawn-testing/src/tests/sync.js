//
// Copyright 2020 DXOS.org
//

const debug = require('debug');
const mri = require('mri');
const { basename } = require('path');

const { Environment } = require('../environment');

const log = debug('dxos:spawn-testing:example');

async function run (opts = {}) {
  const maxPeers = opts.peers || 2;
  const maxTicks = opts.ticks || 1;

  const environment = new Environment();
  await environment.start();
  await environment.addPeers({
    ...opts,
    count: maxPeers
  });

  log('> network full connected');

  log('> sync started');
  console.time('sync');

  await environment.writeMetrics(`./metrics-${basename(__filename)}.log`);

  await environment.runTicks({ count: maxTicks, delay: 1000 });
  log('> finished creating items');

  await environment.waitForSync();

  if (!await environment.comparePeerStates()) {
    log('> state mismatch');
    process.exit(-1);
  }

  log('> sync successful');
  console.timeEnd('sync');

  await environment.destroy();
}

run(mri(process.argv.slice(2)));
