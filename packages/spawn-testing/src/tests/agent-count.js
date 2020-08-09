//
// Copyright 2020 DXOS.org
//

const debug = require('debug');
const mri = require('mri');
const { basename } = require('path');

const { Environment } = require('../environment');

const log = debug('dxos:spawn-testing:example');

async function run ({ ...opts } = {}) {
  const environment = new Environment();
  await environment.start();
  await environment.addPeers(opts);

  log('> network full connected');

  log('> sync started');
  await environment.writeMetrics(`./metrics-${basename(__filename)}.log`);

  for (let readers = 1; readers <= 20; readers++) {
    await environment.addPeers({
      ...opts,
      agent: './src/agents/reading-agent.js'
    });

    const anchor = await environment.waitForSync();
    const start = Date.now();
    await environment.runTicks({ count: 1 });
    await environment.waitForSync(anchor);
    const delta = Date.now() - start;
    log(`Sync readers=${readers} time=${delta}ms`);
    await environment.logEvent({ event: 'batch-sync', readers, delta });
  }
  log('> finished creating items');

  if (!await environment.comparePeerStates()) {
    log('> state mismatch');
    process.exit(-1);
  }

  log('> sync successful');

  await environment.destroy();
}

run(mri(process.argv.slice(2)));
