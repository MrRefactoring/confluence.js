---
'confluence.js': patch
---

Hand-written model types are declared as interfaces.

Twelve v1 models sit on a reference cycle and so have their type spelled out rather than inferred — `Content`,
`Space`, `User`, `Version` and the collections around them. Each was `export type X = { … }`; each is now
`export interface X`. The type is identical, but an interface reports itself by name in an editor instead of
unfolding into its own body, and a consumer can extend or augment it.

One consequence is worth knowing: TypeScript gives a type alias an implicit index signature and an interface none, so
one of these models no longer satisfies `Record<string, unknown>` by assignment. Name the model in the signature
instead of the record — the argument was always one of these shapes.
