import { Client } from '@dxos/client';
import { Keyring, KeyType } from '@dxos/credentials';
import { NetworkManager } from '@dxos/network-manager';
import { FeedStore } from '@dxos/feed-store';
import bufferJson from 'buffer-json-encoding';
import { Environment } from './node';

/**
 * Setup SDK Client using the environment provided
 */
export async function createClientFromEnvironment ({ keyStore, storage, swarmProvider }: Environment) {
  const keyring = new Keyring(keyStore);
  await keyring.createKeyRecord({ type: KeyType.IDENTITY });

  const feedStore = new FeedStore(
    storage,
    {
      feedOptions: {
        valueEncoding: 'buffer-json'
      },
      codecs: {
        'buffer-json': bufferJson
      }
    }
  );
  const networkManager = new NetworkManager(feedStore, swarmProvider);
  const client = new Client({ storage: storage, feedStore, keyring, networkManager });
  await client.initialize();
  await client.partyManager.identityManager.initializeForNewIdentity();
  return client;
}
