---
title: Installation
description: Install confluence.js — requirements, ESM-only notes, entry points and what it depends on.
---

# Installation

```bash
pnpm add confluence.js
# or: npm install confluence.js
# or: yarn add confluence.js
```

## Requirements

| | |
|---|---|
| Node.js | **22 or newer** — the client uses the built-in `fetch` |
| Module system | **ESM only** — `"type": "module"`, or a bundler |
| TypeScript | 5.0+ with `"moduleResolution": "bundler"` or `"node16"` |

Browsers work too: the transport is `fetch` and there is no Node-only code on the request path. Note that Confluence Cloud does not send CORS headers for browser origins, so a browser app needs a proxy.

## One dependency

Runtime dependencies are **Zod**, and nothing else. axios, form-data, oauth and atlassian-jwt are gone with 2.x — the transport is native `fetch`, and Zod validates responses.

## Entry points

```ts
import { createV1Client, createV2Client, ApiError } from 'confluence.js';
import { createClient } from 'confluence.js/core';
import { getGroups } from 'confluence.js/v1';
import { getPages } from 'confluence.js/v2';
```

| Entry point | What it holds |
|---|---|
| `confluence.js` | `createV1Client`, `createV2Client`, `ApiError`, config types |
| `confluence.js/core` | the transport: `createClient`, OAuth helpers, retry, `ApiError` |
| `confluence.js/v1` | every v1 call as a flat function, plus its parameter and response types |
| `confluence.js/v2` | the same for v2 |

The root does **not** re-export `confluence.js/v1` and `confluence.js/v2`: the two versions collide on names like `createSpace` and `getTasks`. Import them from their own entry points, which is also what keeps bundles small — see [Tree-Shaking](./tree-shaking).

## ESM-only

There is no CommonJS build. From CJS, use a dynamic import:

```js
const { createV2Client } = await import('confluence.js');
```

If your bundler or type checker complains about resolution, [TypeScript](./typescript) covers the settings that work.
