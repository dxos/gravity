import { ReadOnlyEvent, Event } from '@dxos/async';

// TODO(marik-d): Move this and the implementation in echo to @dxos/async
export function raise (error: Error): never {
  throw error;
}

// TODO (marik-d): Should handle unsubscriptions via event.whenObserved(() => { doStuff; return cleanupCallback }) (not implemented yet)
// TODO (marik-d): Move to @dxos/async
/**
 * Combines multiple event source into one, where an event in any source results in event being emitted in returned Event instance.
 * @param events
 */
export function combine<T> (events: Event<T>[]): ReadOnlyEvent<T> {
  const res = new Event<T>();

  for (const event of events) {
    event.on(x => res.emit(x));
  }

  return res;
}

export function sum (arr: number[]) {
  let sum = 0;
  for (const item of arr) {
    sum += item;
  }
  return sum;
}
