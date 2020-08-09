//
// Copyright 2020 DXOS.org
//

import { withClientContext } from '../context';
import { ObjectModel } from '@dxos/echo-db';

class BulkCreateAgent {
  constructor (ctx) {
    this._ctx = ctx;
  }

  async init () {
    this._model = await this._ctx.createModel(ObjectModel, { type: 'example.com/Test' });
  }

  tick ({ batchSize = 100 }) {
    for (let i = 0; i < batchSize; i++) {
      this._model.createItem('example.com/Test', { foo: 1 });
    }
  }
}

export default withClientContext(BulkCreateAgent);
