import { Environment } from '../src/runtime/node';
import { Agent } from '../src/runtime/agent';
import { JsonObject } from '../src/common';

export default class TestAgent implements Agent {
  private _count = 0;

  constructor (private environment: Environment) { }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async init () { }

  onEvent (event: JsonObject) {
    this._count++;

    this.environment.logMessage('Count is now', this._count);
  }

  async snapshot () {
    return { count: this._count };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async destroy () { }
}
