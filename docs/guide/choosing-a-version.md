---
title: Choosing a version — v1 or v2
description: When to use the Confluence Cloud v2 API and when you still need v1. What each version covers, why both ship in confluence.js, and how one client serves both.
---

# Choosing a version

Confluence Cloud has two REST APIs, and `confluence.js` ships both. This page is the short answer to which one you want.

## The short answer

**Reach for v2.** It is where Atlassian is investing, its responses are cleaner, and it is what new endpoints get built on.

**Reach for v1 only for what v2 has no answer for** — the list is below, and it is the whole reason v1 is still here.

## What v2 covers

Pages, blog posts, custom content, whiteboards, databases, folders, smart links, comments (footer and inline), attachments (reading), labels (reading), tasks, versions, spaces, space properties, content properties, space permissions (reading), space roles, users, classification levels, data policies.

```ts
import { createV2Client } from 'confluence.js';

const confluence = createV2Client({ host, auth });

await confluence.page.getPages({ spaceId: ['123456'] });
```

## What only v1 has

| Area | Why v2 cannot do it |
|---|---|
| **Attachment upload** | v2 reads attachments; it cannot create them |
| **Content restrictions** | no v2 equivalent at all |
| **Watches** | page/space/label watchers are v1-only |
| **CQL search** | v2 has no query language |
| **Permission checks** | `checkContentPermission` — "may this user do X" |
| **Content states** | "In progress", "Ready for review", … |
| **Groups** | listing groups and their members |
| **Relations** | favourites, and any relation between entities |
| **Templates & blueprints** | content templates are v1-only |
| **Themes, look and feel, space settings** | site and space appearance |
| **User properties** | arbitrary JSON on a user |
| **Audit records** | the site audit log |
| **Long-running tasks** | the queue behind async operations |
| **Page move / copy / archive** | v2 reads the tree but does not restructure it |
| **Body conversion** | storage → export_view rendering |

```ts
import { createV1Client } from 'confluence.js';

const confluence = createV1Client({ host, auth });

await confluence.search.searchByCQL({ cql: 'type=page and label="release-notes"' });
```

## One host, both versions

Both factories take the **same bare site URL**. The API path belongs to the request, not to your config, so nothing about `host` changes when you switch:

```ts
const host = 'https://your-domain.atlassian.net';

const v2 = createV2Client({ host, auth });
const v1 = createV1Client({ host, auth });

const page = await v2.page.getPageById({ id: 12345 });
const restrictions = await v1.contentRestrictions.getRestrictions({ id: '12345' });
```

Using both side by side is normal and expected — read with v2, reach for v1 where v2 stops.

::: tip Ids are the same content
A v2 page id and a v1 content id are the same number. v2 types it as a `number`, v1 as a `string` — `String(page.id)` is all the conversion there is.
:::

## v1 is a complement, and it is shrinking

v1 is not the old API kept alive. `confluence.js` generates it from Atlassian's **published** v1 spec, and Atlassian keeps pruning that spec as v2 grows: 37 operations that `confluence.js@2` exposed — `getContent`, `createContent`, `getSpace` among them — are already gone from it, because v2 covers them.

That is the direction, not an accident. Expect v1 to narrow further, and move each v1 call to v2 as soon as v2 grows an equivalent. The [migration guide](../migration/v2-to-v3#the-v1-surface-follows-atlassians-current-spec) maps every removed operation to its v2 replacement.

## Which client, one or two?

Two clients cost nothing — they are plain objects over the same transport. But if you would rather have a single one, import the flat functions and drive them with one core client:

```ts
import { createClient } from 'confluence.js/core';
import { getPages } from 'confluence.js/v2';
import { searchByCQL } from 'confluence.js/v1';

const client = createClient({ host, auth });

const pages = await getPages(client, { spaceId: ['123456'] });
const hits = await searchByCQL(client, { cql: 'type=page' });
```

That is also the form that tree-shakes — see [Tree-Shaking](./tree-shaking).
