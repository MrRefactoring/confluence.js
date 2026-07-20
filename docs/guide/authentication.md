---
title: Authentication
description: Authenticate confluence.js with an Atlassian API token or OAuth 2.0 (3LO), including automatic token refresh and cloud id resolution.
---

# Authentication

Both factories take the same `auth` object, and so does `createClient` from `confluence.js/core`.

## Basic (API token)

The quickest way in, and the right one for scripts and back-office jobs. Create a token in [Atlassian account settings](https://id.atlassian.com/manage-profile/security/api-tokens) and pair it with the email of the same account:

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
```

The client sends these as an HTTP Basic header. The token carries **your** permissions — anything it can reach, the script can reach.

## OAuth 2.0 (3LO)

For acting on behalf of other users. Hand over your app credentials and a refresh token, and the client refreshes before expiry, retries once on a `401`, and finds the right site:

```ts
const confluence = createV2Client({
  auth: {
    type: 'oauth2',
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    refreshToken: await tokenStore.refreshToken(),
    onTokenRefresh: async ({ refreshToken, expiresAt }) => {
      await tokenStore.save({ refreshToken, expiresAt });
    },
  },
});
```

There is no `host`: 3LO tokens are rejected on your site's own domain and only work through the Atlassian gateway, so the client derives that URL itself.

3LO has enough moving parts — scope families that differ between v1 and v2, rotating refresh tokens, consent callbacks — that it gets [a guide of its own](./oauth2). Read it before wiring this up.

## Expiring bearer tokens

Outside 3LO — a gateway or a proxy that mints its own tokens — pass a resolver, called on **every request**:

```ts
const confluence = createV2Client({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'bearer', getToken: () => tokenStore.current() },
});
```

And when a token expires mid-flight, `getAuthOn401` re-derives auth and replays the request:

```ts
const confluence = createV2Client({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'bearer', getToken: () => tokenStore.current() },
  getAuthOn401: async () => ({ type: 'bearer', token: await refreshAccessToken() }),
});
```

It fires only on a `401`, and only once per request — a second `401` is a real `ApiError`, not a retry loop.

## JWT (Atlassian Connect) is not supported

3.x dropped JWT. Connect apps authenticate as the *app*, with a shared secret and a signed JWT per request — a different model from the two above, and one that ties the client to the Connect lifecycle.

If you are building a Connect app, stay on `confluence.js@2`. See [the migration guide](../migration/v2-to-v3).

## Where the credentials go

Your credentials reach two places and no others: the `Authorization` header of the requests you make, and — under OAuth 2.0 — Atlassian's own `auth.atlassian.com` and `api.atlassian.com` endpoints for token refresh and site lookup. There is no telemetry, no analytics and no third-party host in this package.
