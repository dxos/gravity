import { Environment } from '../src/node';
import { Agent } from '../src/agent';
import { JsonObject } from '../src/common';

export default class TestAgent implements Agent {
  private _count = 0;

  constructor (private environment: Environment) {
  }

  async init () {

  }

  onEvent (event: JsonObject) {
    this._count++;

    this.environment.logMessage('Count is now', this._count);
  }

  async snapshot () {
    return { count: this._count };
  }

  async destroy () {

  }
}
