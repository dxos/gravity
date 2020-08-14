import { JsonObject } from './common';

export abstract class Agent {
  abstract init(): Promise<void>;

  abstract onEvent(event: JsonObject): void;

  abstract snapshot(): JsonObject;
}
