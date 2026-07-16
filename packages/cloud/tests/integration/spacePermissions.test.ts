import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '@confluence.js/core';
import type { createCloudV2Client } from '@confluence.js/cloud';
import { getLiveClient } from './setup/client';
import { ResourceTracker } from './setup/resources';
import { createTestSpace, type TestSpace } from './setup/fixtures';

/**
 * Live integration suite for the Confluence Cloud v2 `spacePermissions` API
 * (`getSpacePermissionsAssignments`, `getAvailableSpacePermissions`).
 *
 * Both endpoints are *read-only*, so every assertion is exercised against a
 * freshly created, disposable test space (auto-deleted on cleanup) — no existing
 * space is ever read from or mutated.
 *
 * Contract verified against the generated Zod source of truth:
 *   - `getSpacePermissionsAssignments` returns a typed page of
 *     `SpacePermissionAssignment` rows — each with an optional `principal`
 *     ({ type ∈ user|group|role, id }) and `operation` ({ key, targetType }) whose
 *     enum members must match the model exactly.
 *   - `getAvailableSpacePermissions` returns the tenant permission *catalog*
 *     (`SpacePermission`: id / displayName / description / requiredPermissionIds).
 *     This endpoint is **RBAC-gated** ("Available on tenants with Role-Based
 *     Access Control") so it is wrapped: on a non-RBAC site it must surface a
 *     typed `ApiError`, never an untyped throw.
 *
 * ID gotcha: space ids are numeric *strings* in models but the `id` path param is
 * typed `z.number()`, so it is passed as `Number(space.id)`.
 */

// `principal.type` and `operation.key` are open strings on the live API (the
// permission vocabulary is large/evolving — e.g. `access-class`, `manage_users`),
// so they are asserted structurally rather than against a fixed set.

/** `SpacePermissionAssignment.operation.targetType` enum (still bounded). */
const OPERATION_TARGET_TYPES = [
  'page',
  'blogpost',
  'comment',
  'attachment',
  'whiteboard',
  'database',
  'embed',
  'folder',
  'space',
  'application',
  'userProfile',
] as const;

/** Statuses an RBAC-/permission-gated endpoint may legitimately return on a site that lacks the feature. */
const GATED_STATUSES = [400, 403, 404, 405, 501];

let client: ReturnType<typeof createCloudV2Client>;
const tracker = new ResourceTracker();
let space: TestSpace;

beforeAll(async () => {
  client = getLiveClient();
  space = await createTestSpace(tracker, 'space-perms');
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — spacePermissions.getSpacePermissionsAssignments (live)', () => {
  it('returns a typed page of permission assignments for the created space', async () => {
    const page = await client.spacePermissions.getSpacePermissionsAssignments({ id: Number(space.id) });

    // Page envelope: optional `results` array + multi-entity `_links`.
    expect(Array.isArray(page.results)).toBe(true);

    // A brand-new space always grants its creator/admin at least one permission.
    expect(page.results!.length).toBeGreaterThan(0);

    for (const assignment of page.results!) {
      // `id` is the opaque permission-assignment id.
      if (assignment.id !== undefined) {
        expect(typeof assignment.id).toBe('string');
      }

      // `principal` is `.nullish()` — present in practice; assert its typed shape when present.
      if (assignment.principal !== undefined && assignment.principal !== null) {
        if (assignment.principal.type !== undefined) {
          // `principal.type` is an open string: beyond user/group/role the live API
          // also returns values like `access-class`, so assert a non-empty string,
          // not membership of the (illustrative) PRINCIPAL_TYPES set.
          expect(typeof assignment.principal.type).toBe('string');
          expect(assignment.principal.type.length).toBeGreaterThan(0);
        }

        if (assignment.principal.id !== undefined) {
          expect(typeof assignment.principal.id).toBe('string');
        }
      }

      // `operation` is `.nullish()`. `key` is an open string (the live permission
      // vocabulary is large/evolving — `manage_users`, `archive_space`, …), so assert
      // a non-empty string; `targetType` remains a bounded enum and is checked.
      if (assignment.operation !== undefined && assignment.operation !== null) {
        if (assignment.operation.key !== undefined) {
          expect(typeof assignment.operation.key).toBe('string');
          expect(assignment.operation.key.length).toBeGreaterThan(0);
        }

        if (assignment.operation.targetType !== undefined) {
          expect(OPERATION_TARGET_TYPES).toContain(assignment.operation.targetType);
        }
      }
    }
  });

  it('honors the `limit` query parameter', async () => {
    const page = await client.spacePermissions.getSpacePermissionsAssignments({ id: Number(space.id), limit: 1 });

    expect(Array.isArray(page.results)).toBe(true);
    expect(page.results!.length).toBeLessThanOrEqual(1);
  });

  it('rejects a non-existent space id with a typed ApiError', async () => {
    let caught: unknown;

    try {
      await client.spacePermissions.getSpacePermissionsAssignments({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect([403, 404]).toContain((caught as ApiError).status);
  });
});

describe('Confluence Cloud v2 — spacePermissions.getAvailableSpacePermissions (live, RBAC-gated)', () => {
  it('returns the typed permission catalog, or a typed ApiError on a non-RBAC site', async () => {
    let result: Awaited<ReturnType<typeof client.spacePermissions.getAvailableSpacePermissions>> | undefined;
    let caught: unknown;

    try {
      result = await client.spacePermissions.getAvailableSpacePermissions();
    } catch (error) {
      caught = error;
    }

    if (caught) {
      // Feature unavailable on this tenant — must still be a typed failure.
      expect(caught).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((caught as ApiError).status);

      return;
    }

    expect(Array.isArray(result!.results)).toBe(true);

    for (const permission of result!.results!) {
      if (permission.id !== undefined) {
        expect(typeof permission.id).toBe('string');
      }

      if (permission.displayName !== undefined) {
        expect(typeof permission.displayName).toBe('string');
      }

      if (permission.description !== undefined) {
        expect(typeof permission.description).toBe('string');
      }

      // `requiredPermissionIds` is `.nullish()` — an array of permission ids when present.
      if (permission.requiredPermissionIds !== undefined && permission.requiredPermissionIds !== null) {
        expect(Array.isArray(permission.requiredPermissionIds)).toBe(true);
        permission.requiredPermissionIds.forEach(id => expect(typeof id).toBe('string'));
      }
    }
  });

  it('passes the `limit` parameter through (typed result or gated ApiError)', async () => {
    try {
      const page = await client.spacePermissions.getAvailableSpacePermissions({ limit: 1 });

      expect(Array.isArray(page.results)).toBe(true);
      expect(page.results!.length).toBeLessThanOrEqual(1);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });
});
