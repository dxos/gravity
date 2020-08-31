import { JsonObject } from '../common';

/**
 * Agent interface. Defines a set of lifecycle methods.
 */
export interface Agent {
  init(): Promise<void>;

  onEvent(event: JsonObject): void;

  snapshot(): Promise<JsonObject>;

  destroy(): Promise<void>;
}
