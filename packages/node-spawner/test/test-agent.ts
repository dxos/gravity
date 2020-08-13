import { Environment } from '../src/node';
import { Agent } from '../src/agent';
import { JsonObject } from '../src/common';

export default class TestAgent extends Agent {
  private _count = 0;

  constructor (private environment: Environment) {
    super();
  }

  onEvent (event: JsonObject) {
    this._count++;

    this.environment.logMessage('Count is now', this._count);
  }

  snapshot (): JsonObject {
    return { count: this._count };
  }
}