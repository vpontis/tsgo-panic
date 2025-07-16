import "knex";

// Minimal reproduction of the module augmentation that causes tsgo panic
declare module "knex" {
  namespace Knex {
    interface QueryInterface<TRecord extends {} = any> {
      firstOrFail<TKey extends keyof TRecord>(
        ...columns: TKey[]
      ): Knex.QueryBuilder<TRecord, Pick<TRecord, TKey>> &
        Promise<Pick<TRecord, TKey>>;
    }
  }
}
