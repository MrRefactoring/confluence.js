---
title: Error handling
description: How confluence.js reports failures — a typed error per status with predicates to narrow them, NetworkError for transport faults, OAuthError, and the status codes that are really data.
---

# Error handling

Every failure of this client is one of its own error types. Nothing leaks from `fetch`, and nothing is a bare `Error` you have to parse a message out of.

## The shape of it

```
Error
├── ApiError            non-2xx from Confluence
│   ├── AuthError       401
│   │   └── ScopeError  401, a scope the app never asked for
│   ├── ForbiddenError  403
│   ├── NotFoundError   404
│   ├── RateLimitError  429, carries retryAfterMs
│   └── ServerError     5xx
├── NetworkError        no response at all — DNS, TLS, socket, timeout
├── OAuthError          token exchange, refresh, or cloud-id resolution
├── ConfigError         the client cannot be built as configured
└── SchemaMismatchError a 2xx that is not JSON where JSON was promised
```

Plus `ZodError` from Zod itself, when the JSON parsed but its shape drifted.

## Narrowing: prefer the predicates

```ts
import { isNotFoundError, isRateLimitError } from 'confluence.js';

try {
  return await confluence.page.getPageById({ id: 42 });
} catch (error) {
  if (isNotFoundError(error)) return null;

  if (isRateLimitError(error)) {
    await sleep(error.retryAfterMs ?? 60_000);

    return retry();
  }

  throw error;
}
```

`instanceof` works too — `error instanceof NotFoundError`, and every subclass is also `instanceof ApiError`. But reach for the predicates first. They check a branded marker rather than the prototype chain, so they keep working when two copies of this package end up in one `node_modules` — a normal outcome of transitive version ranges, and one where `instanceof` silently answers `false`.

Predicates: `isApiError`, `isAuthError`, `isForbiddenError`, `isNotFoundError`, `isRateLimitError`, `isServerError`, `isNetworkError`, `isOAuthError`, `isConfigError`, `isSchemaMismatchError`, `isScopeError`, `isReauthorizationRequired`.

## `ApiError` — the API said no

```ts
class ApiError extends Error {
  status: number;       // 404
  statusText: string;   // 'Not Found'
  body: unknown;        // Atlassian's error payload, parsed when it was JSON
}
```

`body` is where Confluence explains itself, and the message inside is usually far more specific than the status. It is worth logging:

```ts
if (isApiError(error)) console.error(error.status, JSON.stringify(error.body));
```

### `RateLimitError`

Adds `retryAfterMs`, parsed from the `Retry-After` header — seconds or an HTTP date, both understood — and `undefined` when Confluence did not say.

It is **not** retried for you. A rate limit asks you to slow the whole client down; retrying one call in place papers over that. If you do want it retried, opt in via [`withRetry`](./retries) with `retryRateLimit`.

## `NetworkError` — no answer at all

DNS failures, TLS errors, reset sockets, timeouts. `fetch` reports these as a bare `TypeError: fetch failed` with the real reason buried in `cause`; this wraps them so there is one catch surface:

```ts
if (isNetworkError(error)) {
  console.error(error.code);       // 'ECONNRESET'
  console.error(error.transient);  // true — worth retrying
  console.error(error.cause);      // the original TypeError
}
```

`transient` is what the built-in retry consults. A malformed URL also lands here, with `transient: false`, so it fails immediately instead of being retried three times.

## `OAuthError` — the auth dance failed

Thrown by `exchangeAuthorizationCode`, `refreshOAuth2Token`, `getAccessibleResources`, and by the client when it cannot resolve a cloud id. Carries `status` and `body` when the failure came from Atlassian's auth endpoints.

Deliberately not an `ApiError`: "your refresh token is dead" is a different problem from "that page is missing", and code retrying Confluence calls should not treat them alike.

```ts
if (isReauthorizationRequired(error)) {
  // invalid_grant or access_denied — no refresh can fix it, send the user through consent again.
}
```

## `ZodError` — Atlassian drifted from its own spec

Every response is validated against a Zod schema mirroring Atlassian's OpenAPI spec. A mismatch throws a `ZodError` instead of handing you a silently wrong object.

This is not your bug. It means the live API and the published spec disagree — a field documented as required came back `null`, or an enum grew a value. It is worth [an issue](https://github.com/MrRefactoring/confluence.js/issues): the fix belongs in this package, and each one makes the types truer for everyone.

Note that `ConfigError` and a `ZodError` can also surface from `createV1Client` / `createV2Client` themselves, synchronously, when the config is invalid — before any request goes out.

## Some statuses are data, not failures

Confluence answers a few questions by status code. These throw, but the error *is* the answer:

```ts
// "Is this user restricted from reading this page?"
// 404 = not in the restriction list. 200 = they are.
const restricted = await confluence.contentRestrictions
  .getContentRestrictionStatusForUser({ id: pageId, operationKey: 'read', accountId })
  .then(() => true)
  .catch((error: unknown) => {
    if (isNotFoundError(error)) return false;
    throw error;
  });
```

Others worth knowing, all found against the live API:

| Call | Surprise |
|---|---|
| `group.getGroupMembersByGroupId` with an unknown group | empty page, **not** a 404 |
| `contentStates.getContentsWithState` with an unknown state id | empty page, not an error |
| `themes.getGlobalTheme` on a site using the default theme | **404** — "no theme" has no object |
| `content.archivePages` with an unknown page id | **500** — the work is queued before the id is checked |
| `relation.findTargetFromSource` for `favourite` | **501** — Confluence never implemented it |
| `spacePermissions.addPermissionToSpace` on a roles-only site | **400** — classic permissions are off site-wide; use v2 `spaceRoles` |

## What is retried behind your back

By default, nothing. With `retry` configured, only transient transport failures and 502/503/504 — the same policy [`withRetry`](./retries) applies, so wrapping a call never changes which failures count as temporary. No 4xx is ever retried unless you opt into `retryRateLimit` for 429.
