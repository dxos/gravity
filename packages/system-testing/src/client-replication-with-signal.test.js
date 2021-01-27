//
// Copyright 2019 DXOS.org
//

import ram from 'random-access-memory';
import waitForExpect from 'wait-for-expect';

import { createClient, DefaultModel } from '@dxos/data-client';
import { Keyring, KeyType } from '@dxos/credentials';
import {
  createId,
  createKeyPair,
  keyToString,
  randomBytes,
  sign,
  verify,
  SIGNATURE_LENGTH
} from '@dxos/crypto';

import { TestSignalServer } from './util/test-signal-server';

const signalServer = new TestSignalServer();

jest.setTimeout(15000);

// Helper for creating configured nodes.
export const createTestClient = async () => {
  const keyring = new Keyring();
  await keyring.createKeyRecord({ type: KeyType.IDENTITY });

  // TODO(burdon): Use new Client.
  // Specify the local test signal server
  const client = await createClient(ram, keyring, {
    swarm: {
      signal: process.env.DX_SIGNAL_ENDPOINT || 'ws://localhost:4000',
      // ICE disabled per:
      // https://stackoverflow.com/questions/30742431/webrtc-on-isolated-lan-without-ice-stun-turn-server
      ice: JSON.parse(process.env.DX_ICE_ENDPOINTS || '[]')
    }
  });

  await client.partyManager.identityManager.initializeForNewIdentity();
  return client;
};

/**
 * Writes a message on each client and looks for it on the others.
 */
export const checkReplication = async (partyKey, clients) => {
  const MODEL_TYPE = 'testing.Test';
  const models = [];
  const values = [];
  const topic = keyToString(partyKey);

  // Write a message on each client.
  for await (const client of clients) {
    const model = await client.modelFactory.createModel(DefaultModel, { type: MODEL_TYPE, topic });
    const value = createId();

    await model.appendMessage({ __type_url: MODEL_TYPE, value });
    models.push(model);
    values.push(value);
  }

  // And then check that each one has every message.
  for await (const model of models) {
    await waitForExpect(() => {
      const messages = model.messages.map(message => message.value);
      for (const value of values) {
        expect(messages).toContain(value);
      }
    });
  }
};

/**
 * Performs cleanup.
 * @param clients
 * @return {Promise<[(number | bigint), number, number, number, number, number, number, number, number, number]>}
 */
export const destroyClients = async (clients) => {
  return Promise.all(clients.map(client => client.destroy()));
};

beforeAll(async () => {
  await signalServer.start();
});

afterAll(async () => {
  return signalServer.stop();
});

// TODO(burdon): Failing.
test.skip('Create 2-Node credential Party with Greeting and Replication (signature invitation)', async () => {
  const clientA = await createTestClient();
  const clientB = await createTestClient();
  const clients = [clientA, clientB];

  // Create the Party.
  const party = await clientA.partyManager.createParty();

  // In real life this would be a keypair associated with BotFactory.
  const keyPair = createKeyPair();

  // Provided by Greeter client.
  const greeterSecretValidator = async (invitation, secret) => {
    const signature = secret.slice(0, SIGNATURE_LENGTH);
    const message = secret.slice(SIGNATURE_LENGTH);
    return verify(message, signature, keyPair.publicKey);
  };

  // Issue the invitation on clientA.
  const invitationDescriptor = await clientA.partyManager.inviteToParty(party.publicKey, greeterSecretValidator);

  // The `secret` Buffer is composed of the signature (fixed length) followed by the message (variable length).
  const inviteeSecretProvider = async () => {
    const message = randomBytes(32);
    const signature = sign(message, keyPair.secretKey);
    const secret = Buffer.alloc(signature.length + message.length);
    signature.copy(secret);
    message.copy(secret, signature.length);
    return secret;
  };

  // And then redeem it on clientB.
  await clientB.partyManager.joinParty(invitationDescriptor, inviteeSecretProvider);

  await checkReplication(party.publicKey, clients);
  await destroyClients(clients);
});

// TODO(burdon): Failing.
test.skip('Create 3-Node credential Party with Greeting and Replication (secret invitation)', async () => {
  const clientA = await createTestClient();
  const clientB = await createTestClient();
  const clientC = await createTestClient();
  const clients = [clientA, clientB, clientC];

  // Create the Party.
  const party = await clientA.partyManager.createParty();

  // Shared secret (out of band).
  const secret = '0000';

  // In real life, this would be generated and supplied to the inviter, so they could
  // communicate it to the invitee out-of-band (eg, voice, text, etc.).
  const greeterSecretProvider = async () => Buffer.from(secret);
  const greeterSecretValidator = async (invitation, secret) => secret && secret.equals(invitation.secret);

  // In real life, this one would wait for the user's input.
  const inviteeSecretProvider = async () => Buffer.from(secret);

  {
    // Issue the invitation on clientA.
    const invitationToB = await clientA.partyManager.inviteToParty(party.publicKey,
      greeterSecretProvider, greeterSecretValidator);

    // And then redeem it on clientB.
    await clientB.partyManager.joinParty(invitationToB, inviteeSecretProvider);
  }

  {
    // Issue the invitation to clientC now.
    const invitationToC = await clientB.partyManager.inviteToParty(party.publicKey,
      greeterSecretProvider, greeterSecretValidator);

    // And then redeem it on clientC.
    await clientC.partyManager.joinParty(invitationToC, inviteeSecretProvider);
  }

  await checkReplication(party.publicKey, clients);
  await destroyClients(clients);
});
