import "knex";

// Minimal UnionPick type
type UnionPick<T, K extends keyof T> = T extends unknown ? Pick<T, K> : never;

// Minimal reproduction of the module augmentation that causes tsgo panic
declare module "knex" {
  namespace Knex {
    interface QueryInterface<TRecord extends {} = any> {
      firstOrFail<TKey extends keyof TRecord>(
        ...columns: TKey[]
      ): Knex.QueryBuilder<TRecord, UnionPick<TRecord, TKey>> &
        Promise<UnionPick<TRecord, TKey>>;
    }
  }
}
