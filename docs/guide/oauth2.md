---
title: OAuth 2.0 (3LO)
description: Set up Atlassian OAuth 2.0 (3LO) with confluence.js — app registration, scopes for v1 and v2, the authorization flow, automatic refresh with rotating tokens, and what the common errors actually mean.
---

# OAuth 2.0 (3LO)

Three-legged OAuth lets your app act **on behalf of a user**, with their consent, without ever seeing their password or API token.

Use it when you are building something other people log into. For a script, a cron job or anything that acts as *you*, [an API token](./authentication#basic-api-token) is simpler and has none of the moving parts below.

## The one thing that trips everyone up

A 3LO token **does not work on your site's domain**. `https://your-domain.atlassian.net` answers `401` no matter how valid the token is. Atlassian accepts these tokens only through its gateway:

```
https://api.atlassian.com/ex/confluence/{cloudId}/wiki/api/v2/pages
```

The client builds that URL for you, which is why `host` is optional — and ignored — under OAuth 2.0. If you find yourself debugging a 401 that makes no sense, check the URL first.

## 1. Register the app

In the [developer console](https://developer.atlassian.com/console/myapps/), create an **OAuth 2.0 integration**.

**Access type.** Pick *Resource-level* unless you need otherwise: it limits the grant to the one site the user picks. *Account-level* grants every site on their account.

**Authorization → callback URL.** Where Atlassian sends the user back. `http://localhost:3000/callback` is accepted for development; production must be HTTPS.

**Settings → Client ID and Secret.** The secret is a credential: keep it server-side, out of version control, and never ship it to a browser.

## 2. Choose scopes — including for the API version you use

This is the part that costs people an afternoon. Confluence has **two scope families**, and they map to the two API versions:

| Scope family | Looks like | Covers |
|---|---|---|
| **Granular** | `read:page:confluence` | v2 endpoints — `/wiki/api/v2/…` |
| **Classic** | `read:confluence-content.all` | v1 endpoints — `/wiki/rest/api/…` |

**They can be combined in one app, and if you use both API versions you must.** An app holding only granular scopes gets `401 Unauthorized; scope does not match` from every v1 endpoint, and vice versa. Both tabs live under Permissions → Confluence API → Configure.

Common granular scopes:

| Scope | Needed for |
|---|---|
| `read:page:confluence` | reading pages |
| `write:page:confluence` | creating and updating pages |
| `delete:page:confluence` | deleting pages |
| `read:space:confluence` | `GET /spaces` |
| `read:space-details:confluence` | space details — **not** a substitute for the above |
| `read:attachment:confluence` | attachments |

The last two are worth reading twice: `read:space-details:confluence` does *not* let you list spaces.

Always add **`offline_access`**, or you get no refresh token and the grant dies in an hour.

When an endpoint refuses, the API documentation for that operation names the exact scope it wants.

## 3. Send the user to consent

```ts
import { generateAuthorizationUrl } from 'confluence.js';
import { randomUUID } from 'node:crypto';

const state = randomUUID();

session.oauthState = state; // must survive until the callback

const url = generateAuthorizationUrl({
  clientId: process.env.OAUTH_CLIENT_ID!,
  scopes: ['read:page:confluence', 'write:page:confluence', 'offline_access'],
  redirectUri: 'https://your-app.example/callback',
  state,
});

return redirect(url);
```

`state` is not decoration. It ties the callback to the session that started it, and it is what stops someone else's authorization from being replayed into your user's account. Generate an unguessable value per request.

## 4. Handle the callback

```ts
import { exchangeAuthorizationCode, parseCallbackUrl } from 'confluence.js';

const { code } = parseCallbackUrl(request.url, { expectedState: session.oauthState });

const tokens = await exchangeAuthorizationCode({
  clientId: process.env.OAUTH_CLIENT_ID!,
  clientSecret: process.env.OAUTH_CLIENT_SECRET!,
  code,
  redirectUri: 'https://your-app.example/callback',
});

await tokenStore.save({
  refreshToken: tokens.refreshToken,
  expiresAt: Date.now() + tokens.expiresIn * 1000,
});
```

`parseCallbackUrl` covers the three ways this step fails, all of which are easy to forget by hand: the user pressed **Cancel** (`error=access_denied`, no code), the `state` is missing or wrong, or the URL is not a callback at all. Each throws an `OAuthError`.

## 5. Make requests

```ts
import { createV2Client } from 'confluence.js';

const confluence = createV2Client({
  auth: {
    type: 'oauth2',
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    refreshToken: await tokenStore.refreshToken(),
    expiresAt: await tokenStore.expiresAt(),
    onTokenRefresh: async ({ refreshToken, expiresAt }) => {
      await tokenStore.save({ refreshToken, expiresAt });
    },
  },
});

await confluence.page.getPages({ limit: 25 });
```

No `host`, no `cloudId`: the client calls `accessible-resources`, finds the one site the token can reach, caches the id, and routes everything through the gateway. Requests refresh the token before it expires and retry once on a `401`.

### Both API versions? Share one client

Each client owns its own token state. Two clients built from the same credentials would refresh independently — and since Atlassian rotates the refresh token on every refresh, the first one to refresh invalidates the other's copy. Build the client once and hand it to both factories:

```ts
import { createClient } from 'confluence.js/core';
import { createV1Client, createV2Client } from 'confluence.js';

const client = createClient({ auth: { type: 'oauth2', /* … */ } });

const v1 = createV1Client(client);
const v2 = createV2Client(client);
```

### Picking a site

If the token reaches more than one Confluence site, say which — otherwise the client refuses to guess and lists what it found:

```ts
auth: { type: 'oauth2', /* … */, cloudId: 'a436e0ec-…' }
auth: { type: 'oauth2', /* … */, siteUrl: 'https://your-domain.atlassian.net' }
```

`cloudId` skips the lookup entirely; it is worth caching once you know it.

To show the user a picker, ask directly:

```ts
import { getAccessibleResources } from 'confluence.js';

const sites = await getAccessibleResources(accessToken); // [{ id, name, url, scopes }]
```

## Rotating refresh tokens — read this once, carefully

Atlassian issues **rotating** refresh tokens. Every refresh returns a new one and **kills the one you sent**.

The consequences are all the same shape:

- **Persist the new token every time.** That is what `onTokenRefresh` is for, and it is awaited before the request proceeds, so a slow write cannot lose a rotation.
- **Do not share one refresh token between processes.** Two workers refreshing from the same stored token means one of them ends up holding a dead one.
- **90 days of inactivity ends the grant.** Each refresh resets that clock; a token unused for 90 days is gone and the user has to consent again.

### What the token endpoint actually answers

Atlassian documents `invalid_grant` for a dead refresh token. In practice the live endpoint is less tidy, and the codes overlap in a way worth knowing — these were measured, not read:

| What happened | Status | `error` | `errorDescription` |
|---|---|---|---|
| Refresh token unknown or rotated out | 403 | `unauthorized_client` | `refresh_token is invalid` |
| Refresh token expired or revoked (documented) | 403 | `invalid_grant` | `Unknown or invalid refresh token.` |
| **Wrong client secret** | 401 | `access_denied` | `Unauthorized` |

Note the trap in the last row: a bad client secret produces `access_denied` — the same code a user declining the consent screen produces. Branching on the code alone would send users through consent forever over a wrong environment variable.

`isReauthorizationRequired` knows the difference: it covers the first two rows and a decline seen by `parseCallbackUrl`, and answers `false` for a credentials problem, which stays a plain `OAuthError`.

No refresh can fix a dead grant — the only cure is a new authorization:

```ts
import { isReauthorizationRequired } from 'confluence.js';

try {
  await confluence.page.getPages({});
} catch (error) {
  if (isReauthorizationRequired(error)) {
    await tokenStore.clear();

    return redirect(generateAuthorizationUrl({ /* … */ }));
  }

  throw error;
}
```

The same predicate covers `access_denied` from a declined consent screen, because the remedy is identical.

## Managing tokens yourself

If refresh lives elsewhere in your system, hand over just the access token:

```ts
auth: { type: 'oauth2', accessToken, cloudId }
```

The client will not refresh — it has nothing to refresh with — so an expired token surfaces as an `AuthError`.

`refreshOAuth2Token` is exported for doing it by hand.

## Troubleshooting

| Symptom | Cause |
|---|---|
| `401` on `your-domain.atlassian.net` | 3LO tokens only work through `api.atlassian.com`. Drop `host` and let the client route. |
| `401 Unauthorized; scope does not match` | The scope is missing from the app. Check granular vs classic for the API version you are calling. Surfaces as `ScopeError`; refreshing will not help. |
| `403 invalid_grant` | The refresh token is dead: rotated and not persisted, expired after 90 days idle, or the user changed their password. Re-authorize. |
| No `refreshToken` in the exchange | `offline_access` was not in the requested scopes. |
| `Multiple accessible Confluence resources found` | The token reaches several sites. Pass `cloudId` or `siteUrl`. |
| `No accessible Confluence resources` | The granted scopes cover no Confluence site, or the user has access to none. |

## Security checklist

- Client secret stays server-side. Never in a browser bundle, never in git.
- A fresh, unguessable `state` per authorization, tied to the session, verified on return — `parseCallbackUrl` does the verifying.
- Ask for the narrowest scopes that work. They appear on the consent screen, and users read it.
- Store refresh tokens encrypted at rest; treat them as passwords, because that is what they are.
- Prefer *Resource-level* access so a grant covers one site rather than the whole account.
- To revoke, the user removes the app under their Atlassian account settings — there is no revocation endpoint.
