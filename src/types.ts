// Minimal UnionPick type
export type UnionPick<T, K extends keyof T> = T extends unknown
  ? Pick<T, K>
  : never;