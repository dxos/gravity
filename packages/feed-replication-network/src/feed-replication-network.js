//
// Copyright 2020 DXOS.org
//

import assert from 'assert';
import debug from 'debug';

import { createId, keyToBuffer } from '@dxos/crypto';
import { ProtocolNetworkGenerator } from '@dxos/protocol-network-generator';

const log = debug('dxos:feed-replication-network');

// TODO(dboreham): Add to @dxos/crypto
const createKey = () => {
  return keyToBuffer(createId());
};

/**
 * Must be called once after object creation and before use.
 * @param opts
 * @property opts.peerCount {number} - Create this many peers.
 * @property opts.initializeConnected - Connect initial peer set if true.
 * @returns {Promise<Network>} - Network from '@dxos/network-generator
 */
export const createReplicationNetwork = async (opts, peerFactory) => {
  assert(peerFactory);
  assert(opts);
  const { peerCount, initializeConnected = true } = opts;
  assert(!isNaN(peerCount));
  log(`Create ${initializeConnected ? 'connected' : 'unconnected'} network with ${peerCount} peers`);
  const generator = new ProtocolNetworkGenerator(peerFactory);
  const generatorParameters = {
    // Feed replication requires a topic, but we don't care what it is.
    topic: createKey(),
    // TODO(dboreham): This is funky. Graph generator functions take varying numbers of params. The two we use only take one.
    parameters: [peerCount]
  };
  return initializeConnected ? generator.complete(generatorParameters) : generator.noLinks(generatorParameters);
};
