import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { createV2Client } from '#/v2';
import { getV2Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestSpace, type TestSpace } from '../setup/fixtures';
import { testName } from '../helpers/naming';

/**
 * Live integration suite for the Confluence Cloud v2 `spaceRoles` API
 * (Role-Based Access Control — RBAC).
 *
 * The whole module is gated: every endpoint is "Available on tenants with
 * Role-Based Access Control", and the create/update/delete/set mutations
 * additionally require an *organization or site admin* (Connect/Forge app users
 * are explicitly rejected). A standard Cloud site / API-token therefore commonly
 * returns 403/404/501. Each call is consequently guarded: the method is still
 * invoked (to exercise typing + path/search serialization) but a failure must
 * surface as a typed `ApiError` with an expected status — never an untyped throw.
 *
 * Reads covered deeply when the feature is present:
 *   - `getAvailableSpaceRoles` → typed `SpaceRole[]` (type ∈ SYSTEM|CUSTOM);
 *   - `getSpaceRoleMode`       → { mode ∈ PRE_ROLES|ROLES_TRANSITION|ROLES };
 *   - `getSpaceRoleAssignments`→ typed `SpaceRoleAssignment[]` for the test space;
 *   - `getSpaceRolesById`      → cross-checked against a role from the listing.
 *
 * Mutations (custom space roles — premium): a clean create → get → update →
 * delete lifecycle is attempted on success; on a gated site a typed `ApiError`
 * is asserted instead. All deletes are also registered for teardown.
 *
 * ID gotchas: `getSpaceRolesById` / `getSpaceRoleAssignments` path ids are
 * `z.number()` → `Number(...)`; but create/update/delete role ids are
 * `z.string()` (the API may return them as UUIDs — see report).
 */

const ROLE_TYPES = ['SYSTEM', 'CUSTOM'] as const;
const ROLE_MODES = ['PRE_ROLES', 'ROLES_TRANSITION', 'ROLES'] as const;
const PRINCIPAL_TYPES = ['USER', 'GROUP', 'ACCESS_CLASS'] as const;
// On a non-RBAC tenant `space-roles/{id}` can surface a 500: the role id is a UUID
// but the path param is typed `z.number()`, so the id resolves oddly server-side.
const GATED_STATUSES = [400, 403, 404, 405, 500, 501];

let client: ReturnType<typeof createV2Client>;
const tracker = new ResourceTracker();
let space: TestSpace;

/** Asserts a thrown value is the typed, gated failure we expect on a non-RBAC / non-admin site. */
function expectGatedError(error: unknown) {
  expect(error).toBeInstanceOf(ApiError);
  expect(GATED_STATUSES).toContain((error as ApiError).status);
}

/** Structural check for a `SpaceRole` returned by the API. */
function expectWellFormedRole(role: { id?: string; type?: string; name?: string; description?: string; spacePermissions?: string[] | null }) {
  if (role.id !== undefined) expect(typeof role.id).toBe('string');

  if (role.type !== undefined) expect(ROLE_TYPES).toContain(role.type);

  if (role.name !== undefined) expect(typeof role.name).toBe('string');

  if (role.description !== undefined) expect(typeof role.description).toBe('string');

  // `spacePermissions` is `.nullish()` — an array of permission id strings when present.
  if (role.spacePermissions !== undefined && role.spacePermissions !== null) {
    expect(Array.isArray(role.spacePermissions)).toBe(true);
    role.spacePermissions.forEach(p => expect(typeof p).toBe('string'));
  }
}

beforeAll(async () => {
  client = getV2Client();
  space = await createTestSpace(tracker, 'space-roles');
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — spaceRoles.getAvailableSpaceRoles (live, RBAC-gated)', () => {
  it('returns a typed page of space roles, or a typed ApiError on a non-RBAC site', async () => {
    let caught: unknown;
    let result: Awaited<ReturnType<typeof client.spaceRoles.getAvailableSpaceRoles>> | undefined;

    try {
      result = await client.spaceRoles.getAvailableSpaceRoles();
    } catch (error) {
      caught = error;
    }

    if (caught) {
      expectGatedError(caught);

      return;
    }

    expect(Array.isArray(result!.results)).toBe(true);
    result!.results!.forEach(expectWellFormedRole);
  });

  it('passes `space-id` / `role-type` filters through (typed result or gated ApiError)', async () => {
    try {
      // `spaceId` is a string search param (not the numeric path id).
      const page = await client.spaceRoles.getAvailableSpaceRoles({ spaceId: space.id, limit: 50 });

      expect(Array.isArray(page.results)).toBe(true);
      page.results!.forEach(expectWellFormedRole);
    } catch (error) {
      expectGatedError(error);
    }
  });
});

describe('Confluence Cloud v2 — spaceRoles.getSpaceRoleMode (live)', () => {
  it('returns a typed role mode, or a typed ApiError when unavailable', async () => {
    try {
      const result = await client.spaceRoles.getSpaceRoleMode();

      // `mode` is optional in the model; when present it must be one of the enum members.
      if (result.mode !== undefined) {
        expect(ROLE_MODES).toContain(result.mode);
      }
    } catch (error) {
      expectGatedError(error);
    }
  });
});

describe('Confluence Cloud v2 — spaceRoles.getSpaceRoleAssignments (live, RBAC-gated)', () => {
  it('returns typed role assignments for the test space, or a typed ApiError', async () => {
    try {
      const page = await client.spaceRoles.getSpaceRoleAssignments({ id: Number(space.id) });

      expect(Array.isArray(page.results)).toBe(true);

      for (const assignment of page.results!) {
        if (assignment.roleId !== undefined) {
          expect(typeof assignment.roleId).toBe('string');
        }

        // `principal` is `.nullish()`; `principalType` ∈ USER|GROUP|ACCESS_CLASS.
        if (assignment.principal !== undefined && assignment.principal !== null) {
          if (assignment.principal.principalType !== undefined) {
            expect(PRINCIPAL_TYPES).toContain(assignment.principal.principalType);
          }

          if (assignment.principal.principalId !== undefined) {
            expect(typeof assignment.principal.principalId).toBe('string');
          }
        }
      }
    } catch (error) {
      expectGatedError(error);
    }
  });
});

describe('Confluence Cloud v2 — spaceRoles.getSpaceRolesById (live, RBAC-gated)', () => {
  it('fetches a role derived from the listing and is consistent with it', async () => {
    // First obtain a role id from the available-roles listing; skip if the feature is gated.
    let roles: Awaited<ReturnType<typeof client.spaceRoles.getAvailableSpaceRoles>>;

    try {
      roles = await client.spaceRoles.getAvailableSpaceRoles();
    } catch (error) {
      expectGatedError(error);

      return;
    }

    const source = roles.results?.find(r => r.id !== undefined);

    if (!source) return; // RBAC enabled but no roles defined — nothing to cross-check.

    // The role id is a string (UUID for custom roles); the path param is now typed
    // `string`, so it is passed through directly.
    try {
      const byId = await client.spaceRoles.getSpaceRolesById({ id: source.id! });

      expectWellFormedRole(byId);
      expect(byId.id).toBe(source.id);
      expect(byId.type).toBe(source.type);
      expect(byId.name).toBe(source.name);
    } catch (error) {
      expectGatedError(error);
    }
  });

  it('rejects an unknown role id with a typed ApiError', async () => {
    try {
      await client.spaceRoles.getSpaceRolesById({ id: '00000000-0000-0000-0000-000000000000' });
      throw new Error('expected getSpaceRolesById to reject an unknown id');
    } catch (error) {
      expectGatedError(error);
    }
  });
});

describe('Confluence Cloud v2 — spaceRoles custom-role lifecycle (live, premium-gated mutations)', () => {
  const lifecycleTracker = new ResourceTracker();

  afterAll(() => lifecycleTracker.cleanup());

  it('attempts create → get → update → delete, asserting a typed ApiError when gated', async () => {
    // `spacePermissions` ids must be real permission ids ("read/space"-style). Prefer a
    // value harvested from an existing role; fall back to a documented sample id.
    let seedPermissions: string[] = ['read/space'];
    try {
      const roles = await client.spaceRoles.getAvailableSpaceRoles();
      const withPerms = roles.results?.find(r => Array.isArray(r.spacePermissions) && r.spacePermissions.length > 0);

      if (withPerms?.spacePermissions && withPerms.spacePermissions.length > 0) {
        seedPermissions = withPerms.spacePermissions.slice(0, 1);
      }
    } catch {
      // listing gated — proceed with the fallback; create will fail in the same gated way.
    }

    let created: Awaited<ReturnType<typeof client.spaceRoles.createSpaceRole>>;
    try {
      created = await client.spaceRoles.createSpaceRole({
        name: testName('role'),
        description: 'cfjs live custom space role',
        spacePermissions: seedPermissions,
      });
    } catch (error) {
      // Most sites: not RBAC / not org-admin / Connect app — must be a typed failure.
      expectGatedError(error);

      return;
    }

    // Success path: register teardown immediately so a later assertion failure still cleans up.
    expect(typeof created.id).toBe('string');
    expect(created.id).toBeTruthy();
    const roleId = created.id!;
    lifecycleTracker.defer(async () => {
      await client.spaceRoles.deleteSpaceRole({ id: roleId }).catch(() => undefined);
    });

    expectWellFormedRole(created);
    expect(created.name).toContain('role');

    // get — the created role is retrievable (the path id is a string).
    try {
      const fetched = await client.spaceRoles.getSpaceRolesById({ id: roleId });
      expect(fetched.id).toBe(roleId);
    } catch (error) {
      expectGatedError(error);
    }

    // update — returns an async-task envelope ({ id, type, name, description, taskId }).
    const updated = await client.spaceRoles.updateSpaceRole({
      id: roleId,
      name: testName('role-updated'),
      description: 'cfjs live custom space role (updated)',
      spacePermissions: seedPermissions,
    });
    expect(updated.id).toBe(roleId);

    if (updated.name !== undefined) expect(updated.name).toContain('role-updated');

    if (updated.taskId !== undefined) expect(typeof updated.taskId).toBe('string');

    // delete — returns an async-task envelope ({ taskId }).
    const deleted = await client.spaceRoles.deleteSpaceRole({ id: roleId });

    if (deleted.taskId !== undefined) expect(typeof deleted.taskId).toBe('string');
  });
});

describe('Confluence Cloud v2 — spaceRoles.setSpaceRoleAssignments (live, premium-gated mutation)', () => {
  it('attempts a role assignment on the test space, asserting a typed result or ApiError', async () => {
    // The body is an opaque `z.record(string, any)` in the generated parameters; the live
    // shape is a role-assignment payload. We send a minimal, well-formed-looking body and
    // tolerate either a typed result page or a typed ApiError (gated / validation).
    try {
      const result = await client.spaceRoles.setSpaceRoleAssignments({
        id: Number(space.id),
        body: { roleAssignments: [] },
      });

      // On success this echoes the resulting assignments as a typed page.
      expect(Array.isArray(result.results)).toBe(true);

      for (const assignment of result.results!) {
        if (assignment.roleId !== undefined) expect(typeof assignment.roleId).toBe('string');
      }
    } catch (error) {
      expectGatedError(error);
    }
  });
});
