# tsgo panic reproduction

This package demonstrates a panic in the tsgo compiler when processing Knex module augmentations with complex generic constraints.

## The Issue

When running `bun tsgo` in this package or in `lux/server`, we get:

```
panic: runtime error: slice bounds out of range [:52400] with length 524
```

The panic occurs in `GetLineAndCharacterOfPosition` when tsgo's declaration transformer processes interface method signatures with complex generic type constraints.

## To Reproduce

1. Install dependencies: `bun install`
2. Run regular TypeScript: `bun tsc` (works fine)
3. Run tsgo: `bun tsgo` (panics)

## Root Cause

The issue appears to be related to:
- Module augmentation of the `knex` module
- Complex generic constraints using conditional types (like `UnionPick`)
- Method signatures that return intersection types with `Promise`

This is likely a bug in tsgo's handling of certain TypeScript patterns, as the regular TypeScript compiler handles the code without issues.