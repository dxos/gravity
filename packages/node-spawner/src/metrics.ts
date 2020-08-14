import { Event } from "@dxos/async";
import { dxos } from "./proto/gen/node";
import { raise } from "./util";
import { assert } from "console";
import { Type } from "protobufjs";

export class Metrics {
  private _data = new Map<string, number | string | boolean>();

  readonly update = new Event<dxos.node.IMetricsUpdateEvent>();

  get(key: string) {
    return this._data.get(key);
  }

  getNumber(key: string) {
    const val = this._data.get(key);
    if(val !== undefined && typeof val !== 'number') throw new TypeError()
    return val
  }
  
  getString(key: string) {
    const val = this._data.get(key);
    if(val !== undefined && typeof val !== 'string') throw new TypeError()
    return val
  }

  getBoolean(key: string) {
    const val = this._data.get(key);
    if(val !== undefined && typeof val !== 'boolean') throw new TypeError()
    return val
  }

  asObject() {
    const res = {} as Record<string, number | string | boolean>;
    for(const [key, value] of this._data) {
      res[key] = value;
    }
    return res;
  }

  set(key: string, value: number | string | boolean) {
    this._data.set(key, value)
    this.update.emit({
      key,
      value: {
        bool: typeof value === "boolean" ? value : undefined,
        string: typeof value === "string" ? value : undefined,
        int: typeof value === "number" ? value : undefined,
      }
    })
  }

  applyUpdate(update: dxos.node.IMetricsUpdateEvent) {
    this.set(
      update.key ?? raise(new TypeError()),
      update.value?.bool ?? update.value?.int ?? update.value?.string ?? raise(new TypeError),
    );
  }

  inc(key: string) {
    const value = this.getNumber(key) ?? 0;
    this.set(key, value + 1)
  }
}