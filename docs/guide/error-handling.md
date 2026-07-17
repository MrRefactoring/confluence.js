---
title: Error handling
description: How confluence.js reports failures — ApiError for non-2xx responses, ZodError when Atlassian drifts from its own spec, and the status codes that are really data.
---

# Error handling

Two kinds of failure reach you, and they mean different things.

## `ApiError` — the API said no

Any non-2xx response throws an `ApiError` carrying the status and the parsed body:

```ts
import { ApiError } from 'confluence.js';

try {
  await confluence.page.getPageById({ id: 42 });
} catch (error) {
  if (error instanceof ApiError && error.status === 404) {
    console.log('no such page');
  } else {
    throw error;
  }
}
```

```ts
class ApiError extends Error {
  status: number;       // 404
  statusText: string;   // 'Not Found'
  body: unknown;        // Atlassian's parsed error payload
}
```

`body` is where Confluence explains itself. It is worth logging: the message inside is usually far more specific than the status.

```ts
catch (error) {
  if (error instanceof ApiError) {
    console.error(error.status, JSON.stringify(error.body));
  }
}
```

## `ZodError` — Atlassian drifted from its own spec

Every response is validated against a Zod schema generated from Atlassian's OpenAPI spec. When a response does not match, you get a `ZodError` instead of a silently wrong object:

```ts
import { ZodError } from 'zod';

try {
  await confluence.page.getPageById({ id: 12345 });
} catch (error) {
  if (error instanceof ZodError) {
    // The API returned something its own spec does not describe.
  }
}
```

This is not your bug. It means the live API and the published spec disagree — a field that is documented as required came back `null`, or an enum grew a value. It is worth [an issue](https://github.com/MrRefactoring/confluence.js/issues): the fix belongs in this package, and every one of them makes the types truer for everyone.

## Some statuses are data, not failures

Confluence answers a few questions by status code. These throw an `ApiError`, but the error *is* the answer:

```ts
// "Is this user restricted from reading this page?"
// 404 = not in the restriction list. 200 = they are.
const restricted = await confluence.contentRestrictions
  .getContentRestrictionStatusForUser({ id: pageId, operationKey: 'read', accountId })
  .then(() => true)
  .catch((error: unknown) => {
    if (error instanceof ApiError && error.status === 404) return false;
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

## Nothing is retried behind your back

A `4xx` is never retried — not even a `429`. Retries are opt-in and cover transport faults only; see [Retries](./retries).
