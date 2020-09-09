import { JsonObject, Json } from '../common';

/**
 * Agent interface. Defines a set of lifecycle methods.
 */
export interface Agent {
  init(): Promise<void>;

  onEvent(event: JsonObject): void;

  snapshot(): Promise<JsonObject>;

  destroy(): Promise<void>;

  createParty?(): Promise<Uint8Array>;

  createInvitation?(partyKey: Uint8Array): Promise<Json>;

  joinParty?(partyKey: Uint8Array, invitation: Json): Promise<Json | void>;
}
