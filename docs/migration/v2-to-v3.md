---
title: Migrating from 2.x to 3.0
description: What changed in confluence.js 3.0 — factories instead of classes, fetch instead of axios, both API versions in one package, and the codemod that does the mechanical part.
---

# Migrating from 2.x to 3.0

3.0 reworks the public surface. This page is the map; the [full guide in the repo](https://github.com/MrRefactoring/confluence.js/blob/master/MIGRATION.md) has every detail, and a codemod does the mechanical part:

```bash
npx jscodeshift -t node_modules/confluence.js/tools/codemod/v2-to-v3.ts \
  --parser ts --extensions ts,tsx,js,jsx src/
```

It rewrites what it can and leaves a `TODO(confluence.js@3)` comment wherever a human has to decide.

## The client

```diff
-import { ConfluenceClient } from 'confluence.js';
-
-const client = new ConfluenceClient({
-  host: 'https://your-domain.atlassian.net',
-  authentication: { basic: { email, apiToken } },
-});
+import { createV1Client } from 'confluence.js';
+
+const client = createV1Client({
+  host: 'https://your-domain.atlassian.net',
+  auth: { type: 'basic', email, apiToken },
+});
```

`ConfluenceClient` was the v1 API, so `createV1Client` is the like-for-like replacement. New in 3.0: `createV2Client` gives you the v2 API — 30 namespaces, 218 methods — from the same package and the same host. See [Choosing a version](../guide/choosing-a-version).

## Configuration

| 2.x | 3.0 |
|---|---|
| `authentication: { basic: { email, apiToken } }` | `auth: { type: 'basic', email, apiToken }` |
| `authentication: { oauth2: { accessToken } }` | `auth: { type: 'bearer', token }` |
| `authentication: { jwt: … }` | *removed* — Connect apps stay on 2.x |
| `apiPrefix` | *removed* — the API path is part of the request now |
| `baseRequestConfig` | *removed* — it was an axios config; the transport is `fetch` |
| `middlewares: { onError, onResponse }` | *removed* — use `try`/`catch` |
| `noCheckAtlassianToken: true` | *removed* — v1 always sends the header now |
| — | `retry` — opt-in retry for transient transport failures |
| — | `getAuthOn401` — re-derive auth after a 401 |

### `noCheckAtlassianToken` is gone with nothing to replace it

v1 enforces XSRF protection on every write: without `X-Atlassian-Token: no-check` each one answers `403 XSRF check failed`. In 2.x that was yours to opt into, and forgetting it was the usual first 403. Every v1 write now sends the header itself — there is nothing left to configure.

## Callbacks are gone

Every method returned a promise *and* took a callback. 3.0 is promise-only:

```diff
-client.group.getGroups({}, (error, data) => {
-  if (error) return handle(error);
-  use(data);
-});
+try {
+  use(await client.group.getGroups({}));
+} catch (error) {
+  handle(error);
+}
```

## Errors

```diff
-catch (error) {
-  if (error.response?.status === 404) { /* … */ }
-}
+catch (error) {
+  if (error instanceof ApiError && error.status === 404) { /* … */ }
+}
```

New in 3.0: a response that does not match its schema throws a `ZodError`. See [Error handling](../guide/error-handling).

## Imports

```diff
-import { ConfluenceClient, Config } from 'confluence.js';
-import { Content } from 'confluence.js/api/content';
+import { createV1Client, type ClientConfig } from 'confluence.js';
+import { getGroups } from 'confluence.js/v1';
+import { getPages } from 'confluence.js/v2';
+import { createClient } from 'confluence.js/core';
```

`BaseClient` and the per-namespace classes are gone, as are deep imports like `confluence.js/api/content`.

## The v1 surface follows Atlassian's current spec

This is the break most likely to touch your code, and it is not one we chose.

`confluence.js` follows Atlassian's published OpenAPI spec, and **Atlassian removed 37 operations from the v1 spec** since 2.x shipped — including `getContent`, `createContent` and `getSpace` — because v2 covers them. They are gone from v1 in 3.0 for the same reason.

Nearly all have a v2 equivalent:

| 2.x | 3.0 — `createV2Client()` |
|---|---|
| `content.getContent` | `page.getPages` / `blogPost.getBlogPosts` / `customContent.getCustomContent` |
| `content.getContentById` | `page.getPageById` / `blogPost.getBlogPostById` |
| `content.createContent` | `page.createPage` / `blogPost.createBlogPost` |
| `content.updateContent` | `page.updatePage` / `blogPost.updateBlogPost` |
| `content.deleteContent` | `page.deletePage` / `blogPost.deleteBlogPost` |
| `contentChildrenAndDescendants.getContentChildren` | `children.getPageChildren` / `descendants.getPageDescendants` |
| `contentComments.getContentComments` | `comment.getPageFooterComments` / `comment.getPageInlineComments` |
| `contentAttachments.getAttachments` | `attachment.getPageAttachments` |
| `contentVersions.getContentVersions` | `version.getPageVersions` |
| `contentLabels.getLabelsForContent` | `label.getPageLabels` |
| `contentProperties.*` | `contentProperties.getPageContentProperties` and siblings |
| `space.getSpace`, `space.getSpaces` | `space.getSpaceById` / `space.getSpaces` |
| `spaceProperties.*` | `spaceProperties.getSpaceProperties` and siblings |
| `inlineTasks.*` | `task.getTasks` / `task.getTaskById` |

Three have no replacement here: `contentBody.convertContentBody` (stay on 2.x), and `group.addUserToGroup` / `group.removeMemberFromGroup` (user management moved to the [Admin API](https://developer.atlassian.com/cloud/admin/user-management/rest/)).

One did not move to v2 at all — it stayed in v1 under a new name: `contentAttachments.createAttachments` is now `contentAttachments.createAttachment`, and it no longer needs a hand-built `FormData`. See [Attachments](../recipes/attachments).

## Attachment upload got easier

```diff
-await client.contentAttachments.createAttachments({
-  id: pageId,
-  attachment: { file: fs.createReadStream('report.pdf') },
-});
+await confluence.contentAttachments.createAttachment({
+  id: pageId,
+  attachments: { filename: 'report.pdf', content: bytes },
+});
```

## Still on 2.x?

2.x keeps working. Stay there if you need **JWT / Atlassian Connect**, or `convertContentBody`. Nothing else in 3.0 requires a rewrite that the codemod cannot start for you.
