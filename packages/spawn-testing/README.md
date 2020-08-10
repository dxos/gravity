# @dxos/spawn-testing

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/standard/semistandard)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

Description...

## Install

## Running tests

### Sync test

Spawns multiple peers. Each peer creates a number of objects using `ObjectModel`. The test waits for peers to sync and checks that model states are identical.

```
$ DEBUG=dxos:spawn-testing:* node -r @babel/register src/tests/sync.js [--browser] [--peers 5] [--ticks 10] [--storage chrome|idb|ram] [--agent agentFile.js]
```

### Throughput test

Spawns one peer that creates objects and multiple others that only read. Records how fast peers sync with one another in real time.

```
$ DEBUG=dxos:spawn-testing:* node -r @babel/register src/tests/throughput.js [--browser] [--readers 2] [--ticks 60] [--delay 1000]  [--storage chrome|idb|ram] [--agent agentFile.js]
```

### Batch sync time

Spawns two peers. First peer creates a batch of objects and waits for the second peer to catch up. Then the process repeats with bigger and bigger batches. Sync time is measured with respect to batch size.

```
$ DEBUG=dxos:spawn-testing:* node -r @babel/register src/tests/batch-sync-time.js [--browser] [--storage chrome|idb|ram] [--agent agentFile.js]
```

## Usage example

```javascript
const environment = new Environment();

// start signaling server
await environment.start();

// add peers, all peers will join the same party
await environment.addPeers({
  count: 2, // peer count
  agent: 'src/agents/bulk-create-agent.js', // path to agent file
  storage: 'chrome', // 'ram' | 'idb' | 'chrome'
  browser: true, // run in browser (chrome)
  puppeteerOptions: { headless: false }, // extra options to pass to puppeteer
});

// run the similation for a number of ticks
await environment.runTicks({
  count: 5, // number of ticks to run
  delay: 1000, // delay between ticks in milliseconds
  opts: {}, // extra opts to forward to `agent.tick()` method
});

// wait for all the peers to catch up
await environment.waitForSync();

// check that all models have identical state across peers
if (!await environment.comparePeerStates()) {
  log('> state mismatch');
  process.exit(-1);
}

// stop the simulation and free the resouces
await environment.destroy();
```

## Contributing

PRs accepted.

## License

GPL-3.0 © dxos
