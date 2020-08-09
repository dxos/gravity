//
// Copyright 2020 DXOS.org
//

const debug = require('debug');
const mri = require('mri');
const { basename } = require('path');

const { Environment } = require('../environment');

const log = debug('dxos:spawn-testing:example');

async function run ({ readers = 1, ...opts } = {}) {
  const environment = new Environment();
  await environment.start();
  await environment.addPeers(opts);

  await environment.addPeers({
    ...opts,
    count: readers,
    agent: './src/agents/reading-agent.js'
  });
  log('> network full connected');

  log('> sync started');
  await environment.writeMetrics(`./metrics-${basename(__filename)}.log`);

  for (let batchSizeBase = 1; batchSizeBase < 1_000; batchSizeBase *= 10) {
    for (let batchSizeMultiplier = 1; batchSizeMultiplier < 10; batchSizeMultiplier++) {
      const batchSize = batchSizeBase * batchSizeMultiplier;

      const anchor = await environment.waitForSync();
      const start = Date.now();
      await environment.runTicks({ count: 1, opts: { batchSize } });
      await environment.waitForSync(anchor);
      const delta = Date.now() - start;
      log(`Sync batchSize=${batchSize} time=${delta}ms`);
      await environment.logEvent({ event: 'batch-sync', batchSize, delta });
    }
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
