import { JsonObject } from './common';

export interface Agent {
  init(): Promise<void>;

  onEvent(event: JsonObject): void;

  snapshot(): JsonObject;

  destroy(): Promise<void>;
}
