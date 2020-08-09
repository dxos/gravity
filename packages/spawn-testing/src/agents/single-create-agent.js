//
// Copyright 2020 DXOS.org
//

import { withClientContext } from '../context';
import { ObjectModel } from '@dxos/echo-db';

class SignleCreateAgent {
  constructor (ctx) {
    this._ctx = ctx;
  }

  async init () {
    this._model = await this._ctx.createModel(ObjectModel, { type: 'example.com/Test' });
  }

  tick () {
    this._model.createItem('example.com/Test', { foo: 1 });
  }
}

export default withClientContext(SignleCreateAgent);
