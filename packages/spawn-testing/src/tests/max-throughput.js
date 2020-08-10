//
// Copyright 2020 DXOS.org
//

const debug = require('debug');
const mri = require('mri');
const { basename } = require('path');
const { sleep } = require('@dxos/async');

const { Environment } = require('../environment');

const log = debug('dxos:spawn-testing:test');

async function run ({ testTime = 240, maxLagTime = 2_000, ...opts } = {}) {
  const environment = new Environment();
  await environment.start();

  await environment.addPeers({
    ...opts,
    count: 1
  });
  await environment.addPeers({
    ...opts,
    agent: './src/agents/reading-agent.js',
    count: 1
  });

  await environment.writeMetrics(`./metrics-${basename(__filename)}.log`);

  const [writer, reader] = environment._broker.peers;

  const getState = async () => {
    const [writerState, readerState] = await Promise.all([writer.call('getState'), reader.call('getState')]);
    return {
      processed: readerState.agent.total.updated,
      queued: writerState.agent.total.appended - readerState.agent.total.updated
    };
  };

  const startTime = Date.now();
  while (Date.now() - startTime < testTime * 1_000) {
    await environment.runTicks({ count: 1 });
    const timeElapsed = Date.now() - startTime;
    const { queued, processed } = await getState();
    if (queued === 0 || processed === 0) {
      await sleep(500);
      continue;
    }
    const throughput = processed / timeElapsed;
    const lagTime = queued / throughput;
    if (lagTime > maxLagTime) {
      await sleep(lagTime - maxLagTime / 2);
    }
    log(`${Math.round(timeElapsed / 1_000)}s: ${Math.round(throughput * 1_000)} msg/sec, ${processed} processed, ${queued} queued, ${Math.round(lagTime)}ms lag time`);
  }
  const { processed } = await getState();
  const throughput = processed / (Date.now() - startTime);
  console.log(`Final throughput = ${Math.round(throughput * 1_000)} msg/sec`);

  await environment.waitForSync();

  if (!await environment.comparePeerStates()) {
    log('> state mismatch');
    process.exit(-1);
  }

  log('> sync successful');

  await environment.destroy();
  return throughput;
}

run(mri(process.argv.slice(2)));
