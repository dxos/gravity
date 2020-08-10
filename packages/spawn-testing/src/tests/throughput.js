//
// Copyright 2020 DXOS.org
//

const debug = require('debug');
const mri = require('mri');
const { basename } = require('path');

const { Environment } = require('../environment');

const log = debug('dxos:spawn-testing:example');

async function run ({ readers = 1, messages = 12_000, throughput = 200, ...opts } = {}) {
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
  console.time('sync');

  await environment.writeMetrics(`./metrics-${basename(__filename)}-${throughput}mps.log`);

  const batchSize = 100;
  const ticks = Math.ceil(messages / batchSize);
  const timePerTick = 1000 / throughput * batchSize;
  const startTime = Date.now();
  for (let i = 0; i < ticks; i++) {
    const nextTickTime = startTime + (i + 1) * timePerTick;
    await environment.runTicks({ count: 1, delay: Math.max(0, nextTickTime - Date.now()) });
  }
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
