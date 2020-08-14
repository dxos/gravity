// TODO(marik-d): Move this and the implementation in echo to @dxos/async 
export function raise(error: Error): never {
  throw error;
}