<div align="center">
  <img alt="Confluence.js logo" width="420" src="https://raw.githubusercontent.com/MrRefactoring/confluence.js/master/docs/public/logo.svg"/>

  <a href="https://www.npmjs.com/package/confluence.js"><img alt="NPM version" src="https://img.shields.io/npm/v/confluence.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/confluence.js"><img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/confluence.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://github.com/MrRefactoring/confluence.js"><img alt="build status" src="https://img.shields.io/github/actions/workflow/status/mrrefactoring/confluence.js/ci.yaml?style=flat-square"></a>
  <a href="https://github.com/mrrefactoring/confluence.js/blob/develop/LICENSE"><img alt="license" src="https://img.shields.io/github/license/mrrefactoring/confluence.js?color=green&style=flat-square"/></a>

  <span>Type-safe Confluence REST API client for Node.js and browsers</span>

  <p><b><a href="https://mrrefactoring.github.io/confluence.js/">Documentation</a></b> · <a href="https://mrrefactoring.github.io/confluence.js/guide/getting-started">Getting Started</a> · <a href="https://mrrefactoring.github.io/confluence.js/api/">API Reference</a> · <a href="https://mrrefactoring.github.io/confluence.js/ru/">Русский</a></p>
</div>

## About

`confluence.js` covers both Confluence Cloud REST APIs from one package:

- **[Cloud REST API v2](https://developer.atlassian.com/cloud/confluence/rest/v2/)** — 30 namespaces, 218 methods
- **[Cloud REST API v1](https://developer.atlassian.com/cloud/confluence/rest/v1/)** — 28 namespaces, 130 methods

Both are first-class. Atlassian has not deprecated v1, and the two cover
different ground: v1 still owns what v2 has no equivalent for, and v2 owns
everything Atlassian has moved forward.

Every response is validated at runtime against a [Zod 4](https://zod.dev) schema
derived from Atlassian's OpenAPI spec, so API drift surfaces as a `ZodError`
rather than as `undefined` three call frames later.

- ESM-only, Node ≥ 22, no polyfills — the transport is the built-in `fetch`
- Tree-shakable: only the endpoints you import reach your bundle
- One runtime dependency: `zod`

## Table of Contents

- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Two ways to use it](#two-ways-to-use-it)
- [Choosing between v1 and v2](#choosing-between-v1-and-v2)
- [Error handling](#error-handling)
- [Retries](#retries)
- [Migrating from 2.x](#migrating-from-2x)
- [Other Products](#other-products)
- [License](#license)

## Getting Started

```bash
npm install confluence.js
```

```typescript
import { createV2Client } from 'confluence.js';

const confluence = createV2Client({
  host: 'https://your-domain.atlassian.net',
  auth: {
    type: 'basic',
    email: 'YOUR@EMAIL.ORG',
    apiToken: 'YOUR_API_TOKEN',
  },
});

const page = await confluence.page.createPage({
  spaceId: '123456',
  title: 'Project Overview',
  body: {
    representation: 'storage',
    value: '<p>Welcome to our project documentation</p>',
  },
});

console.log(`Page created: ${page.title}`);
```

`host` is your bare site URL. The API path (`/wiki/api/v2`, `/wiki/rest/api`)
belongs to the request, not to `host` — so one host serves both versions.

## Authentication

### Basic

Create an API token in
[Atlassian account settings](https://id.atlassian.com/manage-profile/security/api-tokens):

```typescript
const confluence = createV2Client({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'basic', email: 'YOUR@EMAIL.ORG', apiToken: 'YOUR_API_TOKEN' },
});
```

### OAuth 2.0 (3LO)

Hand over your app credentials and a refresh token. The client refreshes before
expiry, retries once on a 401, and resolves the cloud id itself:

```typescript
const confluence = createV2Client({
  auth: {
    type: 'oauth2',
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    refreshToken: 'YOUR_REFRESH_TOKEN',
    // Atlassian rotates the refresh token on every refresh — persist the new one.
    onTokenRefresh: ({ refreshToken }) => tokenStore.save(refreshToken),
  },
});
```

No `host`: 3LO tokens only work through `api.atlassian.com`, never on your site's
own domain, so the client builds that URL from the cloud id. Pass `cloudId` or
`siteUrl` if the token can reach more than one site.

`confluence.js` also exports the flow itself — `generateAuthorizationUrl`,
`parseCallbackUrl`, `exchangeAuthorizationCode`, `refreshOAuth2Token` and
`getAccessibleResources`. See the [OAuth 2.0 guide](https://mrrefactoring.github.io/confluence.js/guide/oauth2)
— scopes differ between v1 and v2, and refresh tokens rotate.

For a bearer token from somewhere other than 3LO, hand over a resolver — called
per request — and a hook to re-derive auth after a 401:

```typescript
const confluence = createV2Client({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'bearer', getToken: () => tokenStore.current() },
  getAuthOn401: async () => ({ type: 'bearer', token: await refresh() }),
});
```

> **JWT (Atlassian Connect) is not supported in 3.x.** See
> [MIGRATION.md](./MIGRATION.md#jwt-authentication-is-gone).

## Two ways to use it

**A client object** — the whole API behind namespaces:

```typescript
import { createV2Client } from 'confluence.js';

const confluence = createV2Client({ host, auth });

await confluence.page.getPages({ spaceId: ['123'] });
await confluence.space.getSpaces({ limit: 25 });
```

**Flat functions** — the same endpoints as standalone functions taking a client.
Nothing you do not import reaches your bundle:

```typescript
import { createClient } from 'confluence.js/core';
import { getPages } from 'confluence.js/v2';

const client = createClient({ host, auth });

await getPages(client, { spaceId: ['123'] });
```

One client drives both versions:

```typescript
import { createClient } from 'confluence.js/core';
import { getPages } from 'confluence.js/v2';
import { getGroups } from 'confluence.js/v1';

const client = createClient({ host, auth });

await getPages(client, {});   // → /wiki/api/v2/pages
await getGroups(client, {});  // → /wiki/rest/api/group
```

### Entry points

| Import | What it gives you |
|---|---|
| `confluence.js` | `createV1Client`, `createV2Client`, `ApiError`, config types |
| `confluence.js/v2` | v2 flat functions, parameter and response types |
| `confluence.js/v1` | v1 flat functions, parameter and response types |
| `confluence.js/core` | `createClient`, transport types, OAuth helpers |

`confluence.js/v1` and `confluence.js/v2` are not re-exported from the root: the
two versions collide on a few names (`createSpace`, `getTasks`).

## Choosing between v1 and v2

Reach for **v2** by default — it is where Atlassian is investing. It covers
pages, blog posts, custom content, whiteboards, databases, folders, comments,
attachments, labels, tasks, versions, spaces, space permissions and space roles.

Reach for **v1** only for what v2 has no equivalent for: attachment *upload* (v2
reads attachments but cannot create them), content restrictions, watches,
permission checks, content states, groups, relations, CQL search, templates,
themes, settings, user properties, audit records and long-running tasks.

v1 is a complement to v2, not the old API kept alive. This package tracks
Atlassian's v1 spec as published, and that spec is shrinking: 37 operations that
2.x exposed — `getContent`, `createContent`, `getSpace` among them — are already
gone from it, and 33 of those have a v2 equivalent
([the map](./MIGRATION.md#the-v1-surface-follows-atlassians-current-spec)).
Expect it to narrow further, and treat a v1 call as something to move to v2 once
v2 covers it.

## Error handling

Every failure is one of this package's own error types — nothing leaks from
`fetch`. Non-2xx responses throw an `ApiError` subclass carrying the status and
the parsed body; transport faults throw a `NetworkError`; the OAuth flow throws
an `OAuthError`.

```typescript
import { isNotFoundError, isRateLimitError } from 'confluence.js';

try {
  await confluence.page.getPageById({ id: 42 });
} catch (error) {
  if (isNotFoundError(error)) return null;
  if (isRateLimitError(error)) await sleep(error.retryAfterMs ?? 60_000);
  throw error;
}
```

`AuthError` (401), `ForbiddenError` (403), `NotFoundError` (404),
`RateLimitError` (429) and `ServerError` (5xx) all extend `ApiError`, so
`instanceof` works — but prefer the `isXxx` predicates: they survive two copies
of the package in one `node_modules`, where `instanceof` silently returns false.

A response that does not match its schema throws a `ZodError` instead. That
means Atlassian's API drifted from its own spec, and it is worth
[an issue](https://github.com/MrRefactoring/confluence.js/issues).

## Retries

Off by default. When enabled, retries cover transport-layer failures only —
network errors and 502/503/504:

```typescript
const confluence = createV2Client({
  host,
  auth,
  retry: { maxAttempts: 3, initialDelayMs: 500, backoffFactor: 2 },
});
```

4xx is never retried, 429 included: rate limiting is a signal to slow down, not
a transient fault to paper over.

## Migrating from 2.x

3.0 reworks the public surface — class clients became factories, `authentication`
became `auth`, callbacks and middlewares are gone, and the v1 surface now follows
Atlassian's current spec. See **[MIGRATION.md](./MIGRATION.md)** for the full map;
a codemod handles the mechanical parts:

```bash
npx jscodeshift -t node_modules/confluence.js/tools/codemod/v2-to-v3.ts src/
```

## Other Products

- [jira.js](https://github.com/MrRefactoring/jira.js) — Jira REST API client
- [trello.js](https://github.com/MrRefactoring/trello.js) — Trello REST API client

## License

MIT License © MrRefactoring
See [LICENSE](https://github.com/mrrefactoring/confluence.js/blob/develop/LICENSE) for details.
