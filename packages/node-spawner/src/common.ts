export type Json =
  | null
  | undefined
  | string
  | number
  | boolean
  | Array<Json>
  | JsonObject

export type JsonObject = { [property: string]: Json }
