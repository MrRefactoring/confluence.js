---
title: Getting Started with confluence.js
description: Install confluence.js, create an Atlassian API token, and make your first Confluence Cloud request. Type-safe, ESM-only, validated by Zod.
---

# Getting Started

`confluence.js` is a Confluence Cloud REST API client for Node.js and browsers. It covers **both** API versions — v2 and v1 — from one package, types every request and response, and validates every response at runtime.

## Install

```bash
pnpm add confluence.js
# or: npm install confluence.js
# or: yarn add confluence.js
```

Requires **Node.js 22+**. The package is ESM-only — your project needs `"type": "module"`, or a bundler.

## Get an API token

1. Open [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens).
2. Create a token and copy it — Atlassian shows it once.
3. Pair it with the email address of the same Atlassian account.

Keep both in environment variables. Never commit them.

## First request

```ts
import { createV2Client } from 'confluence.js';

const confluence = createV2Client({
  host: 'https://your-domain.atlassian.net',
  auth: {
    type: 'basic',
    email: process.env.CONFLUENCE_EMAIL!,
    apiToken: process.env.CONFLUENCE_API_TOKEN!,
  },
});

const spaces = await confluence.space.getSpaces({ limit: 5 });

for (const space of spaces.results ?? []) {
  console.log(`${space.key} — ${space.name}`);
}
```

If that printed your spaces, you're set.

## `host` is just your site

`host` is the bare site URL — no `/wiki`, no API path:

```ts
host: 'https://your-domain.atlassian.net'   // ✅
host: 'https://your-domain.atlassian.net/wiki/api/v2'  // ❌
```

The API path (`/wiki/api/v2` for v2, `/wiki/rest/api` for v1) belongs to each request, which is what lets **one host serve both versions**.

## Create a page

```ts
const page = await confluence.page.createPage({
  body: {
    spaceId: '123456',
    status: 'current',
    title: 'Project Overview',
    body: {
      representation: 'storage',
      value: '<p>Welcome to our project documentation.</p>',
    },
  },
});

console.log(`Created: ${page.title} (#${page.id})`);
```

## What's next

- [Choosing a version](./choosing-a-version) — when you need v1 and when v2 is enough. Read this one early; it saves the most time.
- [Authentication](./authentication) — basic auth, OAuth 2.0, and refreshing tokens.
- [Error handling](./error-handling) — `ApiError`, and what a `SchemaMismatchError` means.
- [Recipes](../recipes/pages) — pages, spaces, attachments, search.
