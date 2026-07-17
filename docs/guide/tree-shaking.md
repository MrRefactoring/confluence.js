---
title: Tree-Shaking
description: Keep your bundle small with confluence.js — import flat functions instead of the client object, and pay only for the endpoints you call.
---

# Tree-Shaking

There are two ways to call the API, and they differ in what reaches your bundle.

## The client object

```ts
import { createV2Client } from 'confluence.js';

const confluence = createV2Client({ host, auth });

await confluence.page.getPages({ spaceId: ['123456'] });
```

Convenient, discoverable, and it pulls in **all 30 v2 namespaces** — the factory references every one of them, so a bundler cannot drop any. Perfect for a server. Wasteful in a browser bundle.

## Flat functions

Every endpoint is also a standalone function that takes a client as its first argument:

```ts
import { createClient } from 'confluence.js/core';
import { getPages, createPage } from 'confluence.js/v2';

const client = createClient({ host, auth });

await getPages(client, { spaceId: ['123456'] });
await createPage(client, { body: { spaceId: '123456', status: 'current', title: 'Notes' } });
```

Nothing you do not import is reachable, so nothing else is bundled. Two calls cost two calls.

## One client, both versions

`createClient` is version-agnostic — the API path lives in each generated URL, so the same client drives v1 and v2:

```ts
import { createClient } from 'confluence.js/core';
import { getPages } from 'confluence.js/v2';
import { searchByCQL } from 'confluence.js/v1';

const client = createClient({ host, auth });

await getPages(client, {});                       // → /wiki/api/v2/pages
await searchByCQL(client, { cql: 'type=page' });  // → /wiki/rest/api/search
```

## Name collisions

`confluence.js/v1` and `confluence.js/v2` both export `createSpace`, `getTasks` and a few others — which is why the root re-exports neither. Import from the version's own entry point, and alias when you need both:

```ts
import { createSpace as createSpaceV1 } from 'confluence.js/v1';
import { createSpace as createSpaceV2 } from 'confluence.js/v2';
```

## What you cannot shake off

Zod. Every response is validated, so the schemas are on the request path by construction — that is the price of knowing the data matches its type. They are per-endpoint, though: you carry only the ones you import.
