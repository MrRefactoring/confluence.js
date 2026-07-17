---
title: Restrictions
description: Restrict who can read or edit a Confluence page with confluence.js — content restrictions, permission checks and watches. All v1-only.
---

# Restrictions

Content restrictions have **no v2 equivalent at all** — they are among the clearest reasons v1 still ships. So is `checkContentPermission`, and so are watches.

```ts
import { createV1Client } from 'confluence.js';

const confluence = createV1Client({ host, auth });
```

## Who can do what right now

```ts
const restrictions = await confluence.contentRestrictions.getRestrictions({
  id: '12345',
  expand: ['restrictions.user', 'restrictions.group'],
});

for (const restriction of restrictions.results) {
  console.log(restriction.operation); // 'read' | 'update'
  console.log(restriction.restrictions?.user?.results?.map(user => user.displayName));
}
```

Both operations always come back, even on a completely open page — an empty restriction list *is* the answer "everyone".

Ask about one operation on its own:

```ts
const read = await confluence.contentRestrictions.getRestrictionsForOperation({ id: '12345', operationKey: 'read' });
```

## Restrict a page

```ts
await confluence.contentRestrictions.addRestrictions({
  id: '12345',
  body: [
    {
      operation: 'read',
      restrictions: {
        user: [{ type: 'known', accountId: '5b6d7f20e6dba529eefdbad9' }],
        group: [{ type: 'group', id: groupId }],
      },
    },
  ],
});
```

::: warning A read restriction locks out everyone you did not list
Restricting `read` to a list makes the page invisible to everyone else — including people who could see it a second ago. Add yourself, or you can lock yourself out of your own page.
:::

Lift them all:

```ts
await confluence.contentRestrictions.deleteRestrictions({ id: '12345' });
```

## Is *this* person restricted?

```ts
import { ApiError } from 'confluence.js';

async function isRestricted(pageId: string, accountId: string): Promise<boolean> {
  try {
    await confluence.contentRestrictions.getContentRestrictionStatusForUser({
      id: pageId,
      operationKey: 'read',
      accountId,
    });

    return true;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return false;

    throw error;
  }
}
```

::: tip The status code is the answer
This endpoint replies by status, not by body: **404 means "not in the restriction list"** and 200 means they are. A 404 here is data, not a failure — and it is invisible from the types, so it is easy to mistake for an error.
:::

## May this user do X?

A different question: not "is there a restriction" but "can they, all things considered":

```ts
const result = await confluence.contentPermissions.checkContentPermission({
  id: '12345',
  subject: { type: 'user', identifier: accountId },
  operation: 'read', // 'read' | 'update' | 'delete'
});

if (!result.hasPermission) console.log(result.errors);
```

::: warning A denial is a 200
The call succeeds and reports `hasPermission: false`. Check the field, not the status — code that only looks at the status reads every denial as a grant.
:::

Groups work too — for `type: 'group'`, `identifier` is the group **id**, not its name:

```ts
await confluence.contentPermissions.checkContentPermission({
  id: '12345',
  subject: { type: 'group', identifier: groupId },
  operation: 'update',
});
```

## Watches

Also v1-only. Who is watching a page:

```ts
const watches = await confluence.contentWatches.getWatchesForPage({ id: '12345' });
const spaceWatchers = await confluence.contentWatches.getWatchersForSpace({ spaceKey: 'DOCS' });
```

::: danger `getWatchesForSpace` does not take a space
Despite the name it is `/content/{id}/notification/created` — a **content** endpoint. Hand it a space key and you get a 500. The one you want for a space is `getWatchersForSpace`.
:::

Subscribe and unsubscribe:

```ts
await confluence.contentWatches.addContentWatcher({ contentId: '12345', accountId });
const status = await confluence.contentWatches.getContentWatchStatus({ contentId: '12345', accountId });
await confluence.contentWatches.removeContentWatcher({ contentId: '12345', accountId });
```

Creating a page subscribes you to it, so a fresh page already has one watcher — you.

Spaces and labels work the same way:

```ts
await confluence.contentWatches.addSpaceWatcher({ spaceKey: 'DOCS', accountId });
await confluence.contentWatches.isWatchingSpace({ spaceKey: 'DOCS', accountId });

await confluence.contentWatches.addLabelWatcher({ labelName: 'release-notes', accountId });
await confluence.contentWatches.isWatchingLabel({ labelName: 'release-notes', accountId });
```

A label has to exist — meaning some content carries it — before it can be watched. Watching a free-floating name is a 403, not a 404.
