import { Client } from '@dxos/client';
import { Keyring, KeyType } from '@dxos/credentials';
import { Environment } from './node';

export async function createClientFromEnvironment({ keyStore, storage }: Environment) {
  const keyring = new Keyring(keyStore);
  await keyring.createKeyRecord({ type: KeyType.IDENTITY });
  const client = new Client({ storage: storage, keyring, swarm: { signal: 'ws://localhost:4000' } });
  await client.initialize();
  await client.partyManager.identityManager.initializeForNewIdentity();
  return client
}