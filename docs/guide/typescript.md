---
title: TypeScript
description: TypeScript setup for confluence.js — moduleResolution, importing request and response types, and where the types come from.
---

# TypeScript

## tsconfig

The package is ESM-only and ships `.d.ts` alongside every module. Either modern resolution mode works:

```jsonc
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext",  // or "bundler"
    "target": "es2022",
    "strict": true
  }
}
```

`"moduleResolution": "node"` (the TS 4 default) does **not** work — it predates the `exports` map and will not find `confluence.js/v2`.

## Types come with the calls

Every request parameter and every response is typed, and both are importable:

```ts
import type { Page, CreatePage } from 'confluence.js/v2';
import type { Relation } from 'confluence.js/v1';
import type { ClientConfig, Auth } from 'confluence.js';

function draft(spaceId: string, title: string): CreatePage {
  return { body: { spaceId, status: 'current', title } };
}

function summarise(page: Page): string {
  return `${page.title} (v${page.version?.number})`;
}
```

Parameter types are named after the operation (`CreatePage`, `GetPageById`), response types after the entity (`Page`, `Space`, `Relation`).

## The types are generated from Atlassian's spec

They are not hand-written: `src/v1` and `src/v2` are generated from Atlassian's published OpenAPI documents, so they track the API rather than someone's memory of it.

Where the spec and reality disagree — and they do — the difference is caught by an integration suite that runs every namespace against a live Confluence Cloud site, and fixed in the generator. A response that does not match its type raises a `ZodError` at the boundary; see [Error handling](./error-handling).

## `unknown` over `any`

Where the spec describes no shape, the generated code says `unknown`, not `any`. It is less convenient on purpose: `any` would let a typo through silently, `unknown` makes you look at what actually came back.

## Ids across versions

v2 types content ids as `number`, v1 as `string`. Same id, different declaration — the specs disagree, and the generated types follow their spec rather than inventing a compromise:

```ts
const page = await v2.page.getPageById({ id: 12345 });
const restrictions = await v1.contentRestrictions.getRestrictions({ id: String(page.id) });
```
