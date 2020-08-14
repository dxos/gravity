//
// Copyright 2020 DXOS.org
//

import { EventEmitter } from 'events';

import { randomBytes } from '@dxos/crypto';
import { createStorage } from '@dxos/random-access-multi-storage';

const kModelDescriptor = Symbol('modelDescriptor');

class ModelDescriptor {
  constructor (model) {
    this._model = model;

    this._id = randomBytes(32).toString('hex');
    this._state = {
      appended: 0,
      updated: 0
    };

    model.on('preappend', () => {
      this._state.appended++;
    });
    model.on('update', (model, messages) => {
      this._state.updated += messages.length;
    });
  }

  get id () {
    return this._id;
  }

  get objects () {
    return Array.from(this.model._store._objectById.values());
  }

  get state () {
    return {
      ...this._state,
      objectCount: this.objects.length
    };
  }

  get destroyed () {
    return this._model.destroyed;
  }

  get model () {
    return this._model;
  }
}

export const getModelDescriptor = (model) => model[kModelDescriptor];

export class BaseContext extends EventEmitter {
  constructor (opts = {}) {
    super();

    const { storageType } = opts;

    this._storageType = storageType;
    this._identityPublicKey = null;
    this._feedStore = null;
    this._modelFactory = null;
    this._modelDescriptors = new Map();
    this._feedsState = {};
    this._errors = [];
  }

  get models () {
    return Array.from(this._modelDescriptors.values()).map(descriptor => descriptor.model);
  }

  get modelDescriptors () {
    return Array.from(this._modelDescriptors.values());
  }

  get state () {
    const totalState = { appended: 0, updated: 0, objectCount: 0, errors: this._errors };
    const stateByModel = {};
    for (const descriptor of this.modelDescriptors) {
      const modelState = descriptor.state;
      totalState.appended += modelState.appended;
      totalState.updated += modelState.updated;
      totalState.objectCount += modelState.objectCount;
      stateByModel[descriptor.id] = modelState;
    }

    return {
      total: totalState,
      feeds: this._feedsState,
      models: stateByModel
    };
  }

  get identityPublicKey () {
    return this._identityPublicKey;
  }

  async init () {
    this._feedStore.createBatchStream({ live: true }).on('data', messages => {
      const key = messages[0].key;
      const keyStr = key.toString('hex');
      if (!this._feedsState[keyStr]) {
        this._feedsState[keyStr] = {
          processed: 0
        };
      }

      this._feedsState[keyStr].length = this._feedStore.getDescriptors().find(d => d.key.equals(key)).feed.length;
      this._feedsState[keyStr].processed += messages.length;
    });
  }

  async createParty () {
    throw new Error('createParty not implemented');
  }

  createInvitation () {
    throw new Error('createInvitation not implemented');
  }

  async joinParty (invitation) {
    throw new Error('joinParty not implemented');
  }

  async tick () {
    throw new Error('tick not implemented');
  }

  agetParties () {
    throw new Error('getParties not implemented');
  }

  async createModel (ModelClass, options = {}) {
    // TODO(tinchoz49): maybe we can have a setCurrentParty (this.getParties()[0] >> this.getCurrentParty()), so in the future we can test switching from one party to another one.
    const topic = options.topic || this.getParties()[0].publicKey.toString('hex');
    const model = await this._modelFactory.createModel(ModelClass, { ...options, topic });
    const descriptor = new ModelDescriptor(model);
    model.on('update', (_, messages) => {
      const state = descriptor.state;
      this._log('model-update', { messages: messages.length, state });
      this.emit('model-update', { identityPublicKey: this._identityPublicKey, topic, modelId: descriptor.id, messages, state });
    });
    this._modelDescriptors.set(descriptor.id, descriptor);
    model[kModelDescriptor] = descriptor;
    return model;
  }

  getModelObjects () {
    return this.models.reduce((prev, curr) => {
      return [...prev, ...curr[kModelDescriptor].objects];
    }, []);
  }

  _createStorage (storageType) {
    return createStorage(`.temp/${randomBytes(32).toString('hex')}`, storageType || this._storageType);
  }

  _onPartyUpdate (partyInfo) {
    const members = partyInfo.members.map(m => ({
      publicKey: m.publicKey,
      displayName: m.displayName
    }));

    this.emit('party-update', { publicKey: partyInfo.publicKey, members });
  }

  _log (name, props = {}) {
    if (props.err) {
      this._errors.push(props.err);
    }

    const formattedProps = Object.keys(props).map(prop => {
      const value = props[prop];
      return `${prop}=${Buffer.isBuffer(value) ? value.toString('hex').slice(0, 6) : JSON.stringify(value)}`;
    });

    console.log(`${name} client=${this._identityPublicKey.toString('hex').slice(0, 6)} ${formattedProps.join(' ')}`);
  }
}
