---
title: Pages
description: Create, read, update and delete Confluence pages with confluence.js — body formats, versions, the page tree, and moving or copying pages.
---

# Pages

Pages are v2's home ground. The only page operations that still need v1 are the ones that restructure the tree — move, copy, archive.

```ts
import { createV2Client } from 'confluence.js';

const confluence = createV2Client({ host, auth });
```

## Create

```ts
const page = await confluence.page.createPage({
  body: {
    spaceId: '123456',
    status: 'current',
    title: 'Release notes',
    body: {
      representation: 'storage',
      value: '<p>Shipped today.</p>',
    },
  },
});
```

`representation: 'storage'` is Confluence's own XHTML-ish format — the one the editor round-trips without loss. `atlas_doc_format` (ADF) and `wiki` are also accepted.

Pass `parentId` to nest the page under another:

```ts
await confluence.page.createPage({
  body: {
    spaceId: '123456',
    parentId: String(page.id),
    status: 'current',
    title: 'Release notes — 3.0',
    body: { representation: 'storage', value: '<p>Details.</p>' },
  },
});
```

## Read

```ts
const page = await confluence.page.getPageById({ id: 12345, bodyFormat: 'storage' });

console.log(page.title, page.version?.number);
console.log(page.body?.storage?.value);
```

Without `bodyFormat` the body is omitted — ask for the representation you intend to read.

List them by space:

```ts
const pages = await confluence.page.getPages({ spaceId: ['123456'], limit: 25 });

for (const page of pages.results ?? []) console.log(page.title);
```

## Update

An update is a new version, and you must say which one you are creating — Confluence uses it for optimistic locking:

```ts
const current = await confluence.page.getPageById({ id: 12345 });

await confluence.page.updatePage({
  id: 12345,
  body: {
    id: '12345',
    status: 'current',
    title: 'Release notes (revised)',
    body: { representation: 'storage', value: '<p>Now with detail.</p>' },
    version: { number: (current.version?.number ?? 1) + 1 },
  },
});
```

Send a `version.number` that is not `current + 1` and the call is rejected — which is the point: it means someone else edited the page since you read it.

## Delete

```ts
await confluence.page.deletePage({ id: 12345 });
```

That moves the page to the trash. `purge: true` removes it permanently, and `draft: true` deletes a draft.

## Versions

```ts
const versions = await confluence.version.getPageVersions({ id: 12345 });

for (const version of versions.results ?? []) {
  console.log(`v${version.number} — ${version.message ?? 'no message'}`);
}
```

Restoring and deleting versions is v1:

```ts
const v1 = createV1Client({ host, auth });

await v1.contentVersions.restoreContentVersion({
  id: '12345',
  operationKey: 'restore',
  params: { versionNumber: 3, message: 'back to the good one' },
});
```

::: warning Version numbers are positions, not identities
Deleting version 2 of `[4,3,2,1]` leaves `[3,2,1]` — everything above the hole slides down to close it. A version number you held before a delete now points at a *different* version. Re-read the history after any delete.
:::

## The page tree

v2 reads it:

```ts
const children = await confluence.children.getPageChildren({ id: 12345 });
const descendants = await confluence.descendants.getPageDescendants({ id: 12345 });
const ancestors = await confluence.ancestors.getPageAncestors({ id: 12345 });
```

v1 changes it:

```ts
// Move: 'append' makes it a child of the target; 'before'/'after' place it as a sibling.
await v1.contentChildrenAndDescendants.movePage({
  pageId: '12345',
  position: 'append',
  targetId: '67890',
});

// Copy a single page.
const copy = await v1.contentChildrenAndDescendants.copyPage({
  id: '12345',
  destination: { type: 'parent_page', value: '67890' },
  pageTitle: 'Release notes (copy)',
  copyAttachments: true,
});
```

Copying a whole hierarchy is asynchronous — you get a task, not a result:

```ts
const task = await v1.contentChildrenAndDescendants.copyPageHierarchy({
  id: '12345',
  destinationPageId: '67890',
  copyAttachments: true,
  titleOptions: { prefix: 'Copy of ' },
});

// Poll it to completion.
let status = await v1.longRunningTask.getTask({ id: task.id! });

while (!status.finished) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  status = await v1.longRunningTask.getTask({ id: task.id! });
}
```

Archiving works the same way — `content.archivePages` returns a task.
