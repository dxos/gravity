import { JsonObject } from './common';

export interface Agent {
  init(): Promise<void>;

  onEvent(event: JsonObject): void;

  snapshot(): Promise<JsonObject>;

  destroy(): Promise<void>;
}
