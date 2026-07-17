---
title: Spaces
description: Create, read, update and delete Confluence spaces with confluence.js — the v1/v2 split, space properties, permissions and roles.
---

# Spaces

Spaces are the one area where the version split is genuinely awkward: **v2 reads them, v1 writes them.** Atlassian removed `getSpace`/`getSpaces` from the v1 spec and never added create/update/delete to v2, so a lifecycle spans both.

```ts
import { createV1Client, createV2Client } from 'confluence.js';

const host = 'https://your-domain.atlassian.net';
const v2 = createV2Client({ host, auth });
const v1 = createV1Client({ host, auth });
```

## Read — v2

```ts
const spaces = await v2.space.getSpaces({ limit: 25 });

for (const space of spaces.results ?? []) {
  console.log(`${space.key} — ${space.name}`);
}

const space = await v2.space.getSpaceById({ id: 123456 });
```

## Create — v1

Note the shape: v1 takes the properties flat, not wrapped in `body`.

```ts
const created = await v1.space.createSpace({
  key: 'DOCS',
  name: 'Documentation',
  description: { plain: { value: 'Product docs', representation: 'plain' } },
});

console.log(created.id, created.key);
```

A personal, private space instead:

```ts
await v1.space.createPrivateSpace({ key: 'MYNOTES', name: 'My notes' });
```

## Update — v1

```ts
await v1.space.updateSpace({ spaceKey: 'DOCS', name: 'Product documentation' });
```

## Delete — v1, and it is a task

```ts
const task = await v1.space.deleteSpace({ spaceKey: 'DOCS' });
```

::: warning
Deleting a space does not happen inline. The call returns a **long-running task** as soon as the work is queued — the space is still there when the promise resolves. Poll `longRunningTask.getTask({ id: task.id })` if you need to know when it is really gone.
:::

## Space properties

Arbitrary JSON attached to a space. v2 owns these end to end:

```ts
await v2.spaceProperties.createSpaceProperty({
  spaceId: 123456,
  body: { key: 'team.owner', value: { squad: 'platform', slack: '#platform' } },
});

const props = await v2.spaceProperties.getSpaceProperties({ spaceId: 123456 });
const one = await v2.spaceProperties.getSpacePropertyById({ spaceId: 123456, propertyId: 789 });
```

Values round-trip as-is — objects, arrays, strings and numbers all come back the shape you stored them.

## Permissions

Reading is v2:

```ts
const permissions = await v2.spacePermissions.getSpacePermissionsAssignments({ id: 123456, limit: 100 });
```

Writing is v1 — **but only on a site that still uses classic space permissions**:

```ts
await v1.spacePermissions.addPermissionToSpace({
  spaceKey: 'DOCS',
  subject: { type: 'group', identifier: groupId },
  operation: { key: 'read', target: 'space' },
});
```

::: danger Roles-only sites reject this entirely
A site in **roles-only (RBAC) mode** answers every classic permission write with `400 InvalidRbacOperationException: Space permission updates that are not from RBAC are not supported in roles-only mode`. It is not a permission problem and there is no flag to pass — that site manages access through **v2 space roles** instead:

```ts
const roles = await v2.spaceRoles.getSpaceRoles({ spaceId: 123456 });
const assignments = await v2.spaceRoles.getRoleAssignments({ id: 123456 });
```
:::

Two more things the live API insists on, if you *are* on a classic-permissions site:

- `read space` is a prerequisite. Granting anything else to a subject that lacks it fails with a 400 saying so.
- The creator of a space already holds every permission on it. Re-granting one is `400 Permission already exists`, not a no-op.

## Space labels and settings

Both v1-only:

```ts
await v1.experimental.addLabelsToSpace({ spaceKey: 'DOCS', body: [{ prefix: 'global', name: 'product' }] });
const labels = await v1.experimental.getLabelsForSpace({ spaceKey: 'DOCS' });

const settings = await v1.spaceSettings.getSpaceSettings({ spaceKey: 'DOCS' });
const theme = await v1.themes.getSpaceTheme({ spaceKey: 'DOCS' }); // 404 when the space uses the site default
```

`experimental` is Atlassian's own label for that namespace — those endpoints can change without notice.
