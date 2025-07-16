import "knex";
import { UnionPick } from "./types";

// Minimal reproduction of the module augmentation that causes tsgo panic
declare module "knex" {
  namespace Knex {
    interface QueryInterface<TRecord extends {} = any> {
      firstOrFail<TKey extends keyof TRecord>(
        ...columns: TKey[]
      ): Knex.QueryBuilder<TRecord, UnionPick<TRecord, TKey>> &
        Promise<UnionPick<TRecord, TKey>>;

      firstOrFail(
        column: "*"
      ): Knex.QueryBuilder<TRecord, TRecord> & Promise<TRecord>;
    }
  }
}