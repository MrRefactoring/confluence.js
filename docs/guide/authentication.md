---
title: Authentication
description: Authenticate confluence.js with an Atlassian API token or OAuth 2.0 (3LO), including token refresh and the 401 re-auth hook.
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

For acting on behalf of other users, pass the access token as a bearer:

```ts
const confluence = createV2Client({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'bearer', token: accessToken },
});
```

### Tokens that expire

An access token in a variable goes stale. Hand over a resolver instead — it is called on **every request**, so it always sees your current token:

```ts
const confluence = createV2Client({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'bearer', getToken: () => tokenStore.current() },
});
```

And when a token expires mid-flight, `getAuthOn401` re-derives auth once and replays the request:

```ts
const confluence = createV2Client({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'bearer', getToken: () => tokenStore.current() },
  getAuthOn401: async () => ({ type: 'bearer', token: await refreshAccessToken() }),
});
```

It fires only on a `401`, and only once per request — a second `401` is a real `ApiError`, not a retry loop.

## The 3LO flow itself

`confluence.js/core` covers the authorization dance, so you do not need a separate OAuth library:

```ts
import {
  buildAtlassianAuthUrl,
  parseAtlassianCallbackUrl,
  obtainAtlassianOAuthTokens,
  refreshAtlassianOAuthTokens,
} from 'confluence.js/core';

// 1. Send the user here.
const url = buildAtlassianAuthUrl({
  clientId: process.env.OAUTH_CLIENT_ID!,
  redirectUri: 'https://your-app.example/callback',
  scope: ['read:page:confluence', 'write:page:confluence', 'offline_access'],
  state: sessionState,
});

// 2. They come back to your redirect URI.
const { code } = parseAtlassianCallbackUrl(request.url, { expectedState: sessionState });

// 3. Trade the code for tokens.
const tokens = await obtainAtlassianOAuthTokens({
  clientId: process.env.OAUTH_CLIENT_ID!,
  clientSecret: process.env.OAUTH_CLIENT_SECRET!,
  redirectUri: 'https://your-app.example/callback',
  code,
});

// 4. Later, when the access token expires.
const refreshed = await refreshAtlassianOAuthTokens({
  clientId: process.env.OAUTH_CLIENT_ID!,
  clientSecret: process.env.OAUTH_CLIENT_SECRET!,
  refreshToken: tokens.refreshToken,
});
```

Ask for `offline_access` if you want a refresh token.

## JWT (Atlassian Connect) is not supported

3.x dropped JWT. Connect apps authenticate as the *app*, with a shared secret and a signed JWT per request — a different model from the two above, and one that ties the client to the Connect lifecycle.

If you are building a Connect app, stay on `confluence.js@2`. See [the migration guide](../migration/v2-to-v3).

## Where the credentials go

Nowhere but the `Authorization` header of your own requests. There is no telemetry, no analytics and no third-party host in this package — the only network calls are the ones you make, to the `host` you configured.
