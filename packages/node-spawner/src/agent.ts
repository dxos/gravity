import { JsonObject } from './common';

export abstract class Agent {
  abstract onEvent(event: JsonObject): void;

  abstract snapshot(): JsonObject;
}
