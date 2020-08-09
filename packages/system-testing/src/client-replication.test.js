//
// Copyright 2020 DXOS.org
//

// TODO(dboreham): Enable running this test in browser. It is currently not enabled for browser execution
//   because the test takes more than 5s to run (depending on machine speed) and the browser jest testing
//   environment has a hard, not changable, timeout of 5s.

// TODO(dboreham): Reduce these tests to the minimum to prove end to end functionality not already tested in
//   party-manager. Possibly these tests don't need to be in data-client at all (similar tests exist in ./tests).

import ram from 'random-access-memory';
import waitForExpect from 'wait-for-expect';

import { Client } from '@dxos/client';
import { Keyring, KeyType } from '@dxos/credentials';
import { createId, createKeyPair, keyToString, randomBytes, sign, verify, SIGNATURE_LENGTH } from '@dxos/crypto';
import { DefaultModel } from '@dxos/model-factory';
import { InviteDetails, InviteType } from '@dxos/party-manager';

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

test('Create 2-Node credential Party with Greeting and Replication (signature invitation)', async () => {
  const keyringA = new Keyring();
  await keyringA.createKeyRecord({ type: KeyType.IDENTITY });
  const keyringB = new Keyring();
  await keyringB.createKeyRecord({ type: KeyType.IDENTITY });

  const clientA = new Client({ sorage: ram, keyring: keyringA });
  await clientA.initialize();
  await clientA.partyManager.identityManager.initializeForNewIdentity();

  const clientB = new Client({ sorage: ram, keyring: keyringB });
  await clientB.initialize();
  await clientB.partyManager.identityManager.initializeForNewIdentity();
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
  const invitationDescriptor = await clientA.partyManager.inviteToParty(party.publicKey,
    new InviteDetails(InviteType.INTERACTIVE, { secretValidator: greeterSecretValidator }));

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

// TODO(telackey): This test is currently taking too long for the in-browser test limit of 5s.
test('Create 3-Node credential Party with Greeting and Replication (secret invitation)', async () => {
  const keyringA = new Keyring();
  await keyringA.createKeyRecord({ type: KeyType.IDENTITY });
  const keyringB = new Keyring();
  await keyringB.createKeyRecord({ type: KeyType.IDENTITY });
  const keyringC = new Keyring();
  await keyringC.createKeyRecord({ type: KeyType.IDENTITY });

  const clientA = new Client({ sorage: ram, keyring: keyringA });
  await clientA.initialize();
  await clientA.partyManager.identityManager.initializeForNewIdentity();

  const clientB = new Client({ sorage: ram, keyring: keyringB });
  await clientB.initialize();
  await clientB.partyManager.identityManager.initializeForNewIdentity();

  const clientC = new Client({ sorage: ram, keyring: keyringC });
  await clientC.initialize();
  await clientC.partyManager.identityManager.initializeForNewIdentity();

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
      new InviteDetails(InviteType.INTERACTIVE, {
        secretProvider: greeterSecretProvider,
        secretValidator: greeterSecretValidator
      })
    );

    // And then redeem it on clientB.
    await clientB.partyManager.joinParty(invitationToB, inviteeSecretProvider);
  }

  {
    // Issue the invitation to clientC now.
    const invitationToC = await clientB.partyManager.inviteToParty(party.publicKey,
      new InviteDetails(InviteType.INTERACTIVE, {
        secretProvider: greeterSecretProvider,
        secretValidator: greeterSecretValidator
      })
    );

    // And then redeem it on clientC.
    await clientC.partyManager.joinParty(invitationToC, inviteeSecretProvider);
  }

  await checkReplication(party.publicKey, clients);
  await destroyClients(clients);
});
