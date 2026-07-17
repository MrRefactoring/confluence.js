# Migrating from 2.x to 3.0

3.0 reworks the public surface. This page maps every break to what replaces it.

Most of the mechanical work is automated:

```bash
npx jscodeshift -t node_modules/confluence.js/tools/codemod/v2-to-v3.ts --parser ts --extensions ts,tsx,js,jsx src/
```

The codemod rewrites the constructor, the config shape and the import paths, and
leaves a `TODO(confluence.js@3)` comment wherever a decision is yours to make. It
does not touch anything under [What has no automatic replacement](#what-has-no-automatic-replacement).

## Contents

- [The client](#the-client)
- [Configuration](#configuration)
- [Callbacks are gone](#callbacks-are-gone)
- [JWT authentication is gone](#jwt-authentication-is-gone)
- [What has no automatic replacement](#what-has-no-automatic-replacement)
- [The v1 surface follows Atlassian's current spec](#the-v1-surface-follows-atlassians-current-spec)
- [Imports and entry points](#imports-and-entry-points)
- [Errors](#errors)
- [Still on 2.x?](#still-on-2x)

## The client

`ConfluenceClient` was a class exposing the v1 API. It is now two factories, one
per API version:

```diff
-import { ConfluenceClient } from 'confluence.js';
+import { createV1Client } from 'confluence.js';

-const client = new ConfluenceClient({
-  host: 'https://your-domain.atlassian.net',
-  authentication: {
-    basic: { email: 'YOUR@EMAIL.ORG', apiToken: 'YOUR_API_TOKEN' },
-  },
-});
+const client = createV1Client({
+  host: 'https://your-domain.atlassian.net',
+  auth: { type: 'basic', email: 'YOUR@EMAIL.ORG', apiToken: 'YOUR_API_TOKEN' },
+});
```

Namespaces and method names are unchanged, so calls carry over as they are:

```typescript
await client.group.getGroups({ limit: 25 });
```

`host` still takes the bare site URL, exactly as in 2.x.

New in 3.0: `createV2Client` gives you the v2 API — 30 namespaces, 218 methods —
from the same package and the same host. See
[Choosing between v1 and v2](./README.md#choosing-between-v1-and-v2).

## Configuration

| 2.x | 3.0 |
|---|---|
| `authentication: { basic: { email, apiToken } }` | `auth: { type: 'basic', email, apiToken }` |
| `authentication: { oauth2: { accessToken } }` | `auth: { type: 'bearer', token }` |
| `authentication: { jwt: { … } }` | *removed* — see [below](#jwt-authentication-is-gone) |
| `apiPrefix` | *removed* — the API path is part of the request now |
| `baseRequestConfig` | *removed* — it was an axios config; the transport is `fetch` |
| `middlewares: { onError, onResponse }` | *removed* — use `try`/`catch` |
| `noCheckAtlassianToken: true` | *removed* — v1 always sends it, see [below](#nocheckatlassiantoken) |
| — | `retry` — opt-in retry for transient transport failures |
| — | `getAuthOn401` — re-derive auth after a 401 |

### `apiPrefix`

In 2.x the client prepended `apiPrefix` (default `/wiki/rest/`) to every URL. In
3.0 the API path is part of the generated request URL, which is what lets one
client serve both versions. If you used `apiPrefix` to route through a proxy, put
the prefix in `host` instead:

```diff
-const client = new ConfluenceClient({ host: 'https://proxy.internal', apiPrefix: '/confluence/wiki/rest/' });
+const client = createV1Client({ host: 'https://proxy.internal/confluence' });
```

### `noCheckAtlassianToken`

v1 enforces XSRF protection on every write: without `X-Atlassian-Token: no-check`
each one answers `403 XSRF check failed`. In 2.x that was yours to opt into, and
forgetting it was the usual first 403. In 3.0 every generated v1 write sends the
header itself, so the option is gone with nothing to replace it:

```diff
-const client = new ConfluenceClient({ host, authentication, noCheckAtlassianToken: true });
+const client = createV1Client({ host, auth });
```

The codemod deletes the option for you. v2 has no such requirement.

### `middlewares`

```diff
-const client = new ConfluenceClient({
-  host,
-  authentication,
-  middlewares: {
-    onError: error => logger.error(error),
-    onResponse: data => logger.debug(data),
-  },
-});
+const client = createV1Client({ host, auth });
+
+try {
+  const data = await client.group.getGroups({});
+  logger.debug(data);
+} catch (error) {
+  logger.error(error);
+  throw error;
+}
```

## Callbacks are gone

Every method returned a promise *and* accepted a callback. 3.0 is promise-only:

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

## JWT authentication is gone

2.x supported Atlassian Connect JWT via `@atlassian/atlassian-jwt`. 3.0 does not:
`auth` is `basic` or `bearer` only.

JWT is signed per request — the token depends on the request method and URL — so
it cannot be expressed as a static header, and supporting it means carrying a
crypto dependency for every user. Dropping it is what leaves `zod` as the only
runtime dependency.

**If you build an Atlassian Connect app, stay on `confluence.js@2`.** It is not
going away, and it still gets the v1 API it always had.

## What has no automatic replacement

| 2.x | Why | What to do |
|---|---|---|
| `authentication.jwt` | Per-request signing, needs a crypto dependency | Stay on 2.x |
| `middlewares` | The transport no longer has an interceptor stack | `try`/`catch` around calls |
| `baseRequestConfig` | It was an axios config object | `headers` for headers; nothing else carries over |
| Callback arguments | Promise-only API | `await` |

## The v1 surface follows Atlassian's current spec

This is the break most likely to touch your code, and it is not one we chose.

`confluence.js` generates its client from Atlassian's published OpenAPI spec.
Since 2.x was released, **Atlassian removed 37 operations from the v1 spec** —
including `getContent`, `createContent` and `getSpace` — because v2 covers them.
They are gone from v1 in 3.0 for the same reason.

Every one of them has a v2 equivalent:

| 2.x — `client.<ns>.<method>` | 3.0 — `createV2Client()` |
|---|---|
| `content.getContent` | `page.getPages` / `blogPost.getBlogPosts` / `customContent.getCustomContent` |
| `content.getContentById` | `page.getPageById` / `blogPost.getBlogPostById` |
| `content.getContentByTypeForSpace`, `content.getContentForSpace` | `page.getPagesInSpace` / `blogPost.getBlogPostsInSpace` |
| `content.createContent` | `page.createPage` / `blogPost.createBlogPost` |
| `content.updateContent` | `page.updatePage` / `blogPost.updateBlogPost` |
| `content.deleteContent` | `page.deletePage` / `blogPost.deleteBlogPost` |
| `contentChildrenAndDescendants.getContentChildren`, `…ByType` | `children.getPageChildren` / `descendants.getPageDescendants` |
| `contentComments.getContentComments` | `comment.getPageFooterComments` / `comment.getPageInlineComments` |
| `contentAttachments.getAttachments` | `attachment.getPageAttachments` |
| `contentAttachments.createAttachments` | *no v2 equivalent* — see [below](#attachment-upload) |
| `contentAttachments.downloadAttachment` | `attachment.getAttachmentById` then fetch `downloadLink` |
| `contentVersions.getContentVersions`, `getContentVersion` | `version.getPageVersions` / `version.getBlogPostVersions` |
| `content.getHistoryForContent` | `version.getPageVersions` |
| `contentLabels.getLabelsForContent` | `label.getPageLabels` / `label.getBlogPostLabels` |
| `contentProperties.*` | `contentProperties.getPageContentProperties` and siblings |
| `space.getSpace`, `space.getSpaces` | `space.getSpaceById` / `space.getSpaces` |
| `spaceProperties.*` | `spaceProperties.getSpaceProperties` and siblings |
| `contentBody.convertContentBody` | *no v2 equivalent* — stay on 2.x for this one |
| `inlineTasks.searchTasks`, `getTaskById`, `updateTaskById` | `task.getTasks` / `task.getTaskById` |
| `group.addUserToGroup`, `group.removeMemberFromGroup` | *no v2 equivalent* — user management moved to the [Admin API](https://developer.atlassian.com/cloud/admin/user-management/rest/) |

What stayed in v1 is what v2 has no answer for: content restrictions, watches,
permission checks, content states, groups, relations, CQL search, templates,
themes, settings, user properties, audit records and long-running tasks.

### Attachment upload

Neither spec declares multipart upload, so no generated method covers it. Use the
v1 REST endpoint directly with the same auth:

```typescript
const form = new FormData();
form.append('file', new Blob([bytes]), 'report.pdf');

await fetch(`${host}/wiki/rest/api/content/${pageId}/child/attachment`, {
  method: 'POST',
  headers: {
    Authorization: `Basic ${btoa(`${email}:${apiToken}`)}`,
    'X-Atlassian-Token': 'no-check',
  },
  body: form,
});
```

## Imports and entry points

```diff
-import { ConfluenceClient, Config } from 'confluence.js';
-import { Content } from 'confluence.js/api/content';
+import { createV1Client, type ClientConfig } from 'confluence.js';
+import { getGroups } from 'confluence.js/v1';
+import { getPages } from 'confluence.js/v2';
+import { createClient } from 'confluence.js/core';
```

`BaseClient` and the per-namespace classes are gone. If you subclassed
`BaseClient` to assemble a narrow client, compose flat functions instead —
the result tree-shakes, which the subclass never did:

```typescript
import { createClient } from 'confluence.js/core';
import { getGroups } from 'confluence.js/v1';
import { getSpaces } from 'confluence.js/v2';

const client = createClient({ host, auth });

export const custom = {
  groups: () => getGroups(client, {}),
  spaces: () => getSpaces(client, {}),
};
```

Deep imports such as `confluence.js/api/content` no longer resolve. The entry
points are `confluence.js`, `confluence.js/v1`, `confluence.js/v2` and
`confluence.js/core`.

## Errors

2.x rejected with an `AxiosError`. 3.0 throws `ApiError`:

```diff
-import type { Error as ConfluenceError } from 'confluence.js';
+import { ApiError } from 'confluence.js';

 try {
   await client.group.getGroups({});
 } catch (error) {
-  if (error.response?.status === 404) { … }
+  if (error instanceof ApiError && error.status === 404) { … }
 }
```

`ApiError` carries `status`, `statusText` and `body` (the parsed response body).

New in 3.0: a response that does not match its schema throws a `ZodError`. That
means Atlassian's API drifted from its own spec — please
[open an issue](https://github.com/MrRefactoring/confluence.js/issues).

## Still on 2.x?

Staying is a legitimate choice. `confluence.js@2` keeps working and keeps its v1
surface, including the 37 operations Atlassian has since removed from the spec.

Stay on 2.x if you need Atlassian Connect JWT, or `convertContentBody`, or group
membership management. Otherwise 3.0 gives you v2, one runtime dependency, and
responses that are checked rather than assumed.
