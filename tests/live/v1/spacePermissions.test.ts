import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestSpace } from '../setup/fixtures';

/**
 * v1 owns space permission *writes* (v2 only reads them) — but only on a site
 * that still uses classic space permissions.
 *
 * A site in **roles-only mode** rejects every write here with
 * `400 InvalidRbacOperationException: Space permission updates that are not from
 * RBAC are not supported in roles-only mode`, and there is nothing a caller can do
 * about it: RBAC sites manage access through v2 `spaceRoles` instead. That is not
 * a permission problem and not a bad request in any useful sense — it is the whole
 * namespace being unavailable. This suite detects the mode once and asserts the
 * behaviour that site actually has.
 *
 * Everything is scoped to a disposable fixture space, and grants target a group
 * rather than the calling user: whoever creates a space already holds every
 * permission on it, so re-granting one is a `400 Permission already exists`.
 */

const tracker = new ResourceTracker();

let client: V1Client;
let spaceKey: string;
let accountId: string;
let groupId: string;
/** True when the site manages space access through roles, not classic permissions. */
let rolesOnly = false;

/** True for the refusal a roles-only site answers every classic permission write with. */
function isRolesOnlyRefusal(error: unknown): boolean {
  return error instanceof ApiError && JSON.stringify(error.body ?? '').includes('InvalidRbacOperationException');
}

beforeAll(async () => {
  client = getV1Client();

  spaceKey = (await createTestSpace(tracker, 'perms')).key;
  accountId = (await client.users.getCurrentUser({})).accountId!;
  groupId = (await client.group.getGroups({ limit: 1 })).results[0]!.id!;

  try {
    const probe = await client.spacePermissions.addPermissionToSpace({
      spaceKey,
      subject: { type: 'group', identifier: groupId },
      operation: { key: 'read', target: 'space' },
    });

    await client.spacePermissions.removePermission({ spaceKey, id: probe.id! }).catch(() => undefined);
  } catch (error) {
    rolesOnly = isRolesOnlyRefusal(error);

    if (!rolesOnly) throw error;
  }
}, 100_000);

afterAll(async () => {
  await tracker.cleanup();
}, 100_000);

describe('Confluence Cloud v1 — spacePermissions on a roles-only site (live)', () => {
  it('refuses a classic grant with a typed 400 naming RBAC, on a roles-only site', async () => {
    if (!rolesOnly) return;

    const error = await client.spacePermissions
      .addPermissionToSpace({
        spaceKey,
        subject: { type: 'group', identifier: groupId },
        operation: { key: 'read', target: 'space' },
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(400);
    expect(isRolesOnlyRefusal(error)).toBe(true);
  });
});

describe('Confluence Cloud v1 — space permission lifecycle (live, classic-permissions site)', () => {
  it('grants a permission to a group and hands back the id needed to remove it', async () => {
    if (rolesOnly) return;

    const granted = await client.spacePermissions.addPermissionToSpace({
      spaceKey,
      subject: { type: 'group', identifier: groupId },
      operation: { key: 'read', target: 'space' },
    });

    expect(granted.id).toBeDefined();
    expect(granted.operation).toMatchObject({ key: 'read', target: 'space' });

    await client.spacePermissions.removePermission({ spaceKey, id: granted.id! }).catch(() => undefined);
  });

  // `read space` is a prerequisite, not just one permission among many: granting
  // anything else to a subject without it fails with a 400 that says so.
  it('requires `read space` before any other permission for the same subject', async () => {
    if (rolesOnly) return;

    const error = await client.spacePermissions
      .addPermissionToSpace({
        spaceKey,
        subject: { type: 'group', identifier: groupId },
        operation: { key: 'create', target: 'page' },
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(400);
  });

  it('removes a permission it just granted', async () => {
    if (rolesOnly) return;

    const granted = await client.spacePermissions.addPermissionToSpace({
      spaceKey,
      subject: { type: 'group', identifier: groupId },
      operation: { key: 'read', target: 'space' },
    });

    await expect(client.spacePermissions.removePermission({ spaceKey, id: granted.id! })).resolves.not.toThrow();
  });

  // The creator holds every permission on a space they made, so this is not a
  // permission problem — it is the API refusing a duplicate grant.
  it('rejects re-granting a permission the subject already holds', async () => {
    if (rolesOnly) return;

    const error = await client.spacePermissions
      .addPermissionToSpace({
        spaceKey,
        subject: { type: 'user', identifier: accountId },
        operation: { key: 'read', target: 'space' },
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(400);
  });
});

describe('Confluence Cloud v1 — spacePermissions rejections (live, mode-independent)', () => {
  it('rejects an operation/target pair the API does not define with an ApiError', async () => {
    const error = await client.spacePermissions
      .addPermissionToSpace({
        spaceKey,
        subject: { type: 'group', identifier: groupId },
        operation: { key: 'purge_version', target: 'space' },
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });

  it('rejects an unknown space with an ApiError', async () => {
    const error = await client.spacePermissions
      .addPermissionToSpace({
        spaceKey: 'CFJSNOSUCHSPACE',
        subject: { type: 'group', identifier: groupId },
        operation: { key: 'read', target: 'space' },
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });

  it('rejects an unknown subject with an ApiError', async () => {
    const error = await client.spacePermissions
      .addPermissionToSpace({
        spaceKey,
        subject: { type: 'user', identifier: 'cfjs:00000000-0000-0000-0000-000000000000' },
        operation: { key: 'read', target: 'space' },
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });

  it('rejects removing an unknown permission id with an ApiError', async () => {
    const error = await client.spacePermissions.removePermission({ spaceKey, id: 999_999_999 }).catch(e => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — spacePermissions.addCustomContentPermissions (live, gated-graceful)', () => {
  // Custom content types come from apps, so a site with no app installed has no
  // valid target for this — a typed refusal is the expected answer there.
  it('grants custom-content permissions, or surfaces a typed ApiError', async () => {
    try {
      await client.spacePermissions.addCustomContentPermissions({
        spaceKey,
        subject: { type: 'group', identifier: groupId },
        operations: [{ key: 'read', target: 'cfjs:no-such-custom-type', access: true }],
      });
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });
});
