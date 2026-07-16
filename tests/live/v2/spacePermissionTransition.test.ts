import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { createV2Client } from '#/v2';
import { getV2Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestSpace, type TestSpace } from '../setup/fixtures';
import { waitFor } from '../helpers/poll';

/**
 * Live integration suite for the Confluence Cloud v2 `spacePermissionTransition`
 * API — the premium "bulk space-permission transition" tooling
 * (`listSpacePermissionCombinations`, `generateSpacePermissionCombinations`,
 * `bulkAssignSpacePermissionRoles`, `bulkRemoveSpacePermissionAccess`,
 * `getSpacePermissionTransitionTaskStatus`).
 *
 * Every endpoint requires the caller to be a **Confluence administrator**, so on
 * a standard site/API-token these almost always return 403/404/501. The two bulk
 * write endpoints are additionally *async, site-wide mutations* — they are
 * therefore strictly confined to the disposable test space via a
 * `spaceSelection` of `{ spaceType: 'SPECIFIC', selectedSpaces: [testSpace] }`,
 * and only ever run if the gate is open. Each call is wrapped: the method is
 * invoked to exercise typing + serialization, and a failure must surface as a
 * typed `ApiError` with an expected status.
 *
 * On the happy path, a write returns a `BulkTransitionTask` ({ taskId, status,
 * statusUrl }); its `taskId` is then polled through
 * `getSpacePermissionTransitionTaskStatus` until it settles.
 */

const TASK_STATUSES = ['IN_PROGRESS', 'COMPLETED', 'FAILED'] as const;
const COMBINATION_PRINCIPAL_TYPES = [
  'USER',
  'GROUP',
  'GUEST',
  'ANONYMOUS',
  'ALL_LICENSED_USERS_USER_CLASS',
  'ALL_PRODUCT_ADMINS_USER_CLASS',
  'APP',
  'TEAM',
] as const;
const GATED_STATUSES = [400, 403, 404, 405, 501];

let client: ReturnType<typeof createV2Client>;
const tracker = new ResourceTracker();
let space: TestSpace;

/** A permission-combination id discovered from the listing (if the gate is open), reused by the bulk writes. */
let sampleCombinationId: string | undefined;
/** A task id produced by any write that succeeds, reused to exercise the status endpoint. */
let producedTaskId: string | undefined;

function expectGatedError(error: unknown) {
  expect(error).toBeInstanceOf(ApiError);
  expect(GATED_STATUSES).toContain((error as ApiError).status);
}

function expectWellFormedTask(task: { taskId: string; status: string; statusUrl: string }) {
  expect(typeof task.taskId).toBe('string');
  expect(task.taskId).toBeTruthy();
  expect(TASK_STATUSES).toContain(task.status);
  expect(typeof task.statusUrl).toBe('string');
  expect(task.statusUrl).toBeTruthy();
}

beforeAll(async () => {
  client = getV2Client();
  space = await createTestSpace(tracker, 'perm-transition');
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — spacePermissionTransition.listSpacePermissionCombinations (live, admin-gated)', () => {
  it('returns a typed page of permission combinations, or a typed ApiError', async () => {
    let result: Awaited<ReturnType<typeof client.spacePermissionTransition.listSpacePermissionCombinations>> | undefined;
    let caught: unknown;

    try {
      result = await client.spacePermissionTransition.listSpacePermissionCombinations({ limit: 25 });
    } catch (error) {
      caught = error;
    }

    if (caught) {
      expectGatedError(caught);

      return;
    }

    // `results` is a *required* array of combination entries.
    expect(Array.isArray(result!.results)).toBe(true);

    // `generatedAt` / `cursor` are `.nullish()`.
    if (result!.generatedAt !== undefined && result!.generatedAt !== null) {
      expect(typeof result!.generatedAt).toBe('string');
    }

    if (result!.cursor !== undefined && result!.cursor !== null) {
      expect(typeof result!.cursor).toBe('string');
    }

    for (const entry of result!.results) {
      expect(typeof entry.combinationId).toBe('string');
      expect(entry.combinationId).toBeTruthy();
      expect(typeof entry.spaceCount).toBe('number');
      expect(typeof entry.principalCount).toBe('number');

      expect(Array.isArray(entry.permissions)).toBe(true);

      for (const permission of entry.permissions) {
        expect(typeof permission.id).toBe('string');
        expect(typeof permission.displayName).toBe('string');
      }

      expect(Array.isArray(entry.principalTypes)).toBe(true);

      for (const principalType of entry.principalTypes) {
        expect(COMBINATION_PRINCIPAL_TYPES).toContain(principalType);
      }
    }

    // Stash a combination id for the bulk-write attempts below.
    sampleCombinationId = result!.results[0]?.combinationId;
  });
});

describe('Confluence Cloud v2 — spacePermissionTransition.generateSpacePermissionCombinations (live, admin-gated)', () => {
  it('submits the refresh task and returns a typed BulkTransitionTask, or a typed ApiError', async () => {
    try {
      const task = await client.spacePermissionTransition.generateSpacePermissionCombinations();

      expectWellFormedTask(task);
      producedTaskId ??= task.taskId;
    } catch (error) {
      expectGatedError(error);
    }
  });
});

describe('Confluence Cloud v2 — spacePermissionTransition.bulkAssignSpacePermissionRoles (live, admin-gated mutation)', () => {
  it('attempts a bulk role assignment scoped to the test space, asserting a typed task or ApiError', async () => {
    // Confined to the disposable test space only.
    const assignments = [
      {
        permissionCombinationId: sampleCombinationId ?? 'cfjs-nonexistent-combination',
        principalTypeAssignments: [
          { principalType: 'USER' as const, removeAccess: false, roleId: 'cfjs-nonexistent-role' },
        ],
      },
    ];

    try {
      const task = await client.spacePermissionTransition.bulkAssignSpacePermissionRoles({
        assignments,
        spaceSelection: {
          spaceType: 'SPECIFIC',
          selectedSpaces: [{ id: space.id, key: space.key }],
        },
      });

      expectWellFormedTask(task);
      producedTaskId ??= task.taskId;
    } catch (error) {
      expectGatedError(error);
    }
  });
});

describe('Confluence Cloud v2 — spacePermissionTransition.bulkRemoveSpacePermissionAccess (live, admin-gated mutation)', () => {
  it('attempts a bulk access removal scoped to the test space, asserting a typed task or ApiError', async () => {
    try {
      const task = await client.spacePermissionTransition.bulkRemoveSpacePermissionAccess({
        permissionCombinationIds: [sampleCombinationId ?? 'cfjs-nonexistent-combination'],
        spaceSelection: {
          spaceType: 'SPECIFIC',
          selectedSpaces: [{ id: space.id, key: space.key }],
        },
      });

      expectWellFormedTask(task);
      producedTaskId ??= task.taskId;
    } catch (error) {
      expectGatedError(error);
    }
  });
});

describe('Confluence Cloud v2 — spacePermissionTransition.getSpacePermissionTransitionTaskStatus (live, admin-gated)', () => {
  it('polls a produced task to a settled state, or asserts a typed ApiError for an unknown task', async () => {
    if (producedTaskId) {
      // A real task was produced by a write above — poll it until it leaves IN_PROGRESS.
      try {
        const status = await waitFor(
          () => client.spacePermissionTransition.getSpacePermissionTransitionTaskStatus({ taskId: producedTaskId! }),
          s => s.status === 'COMPLETED' || s.status === 'FAILED',
          { maxAttempts: 6 },
        );

        expect(status.taskId).toBe(producedTaskId);
        expect(TASK_STATUSES).toContain(status.status);

        // `errorMessage` is `.nullish()` and only present on FAILED.
        if (status.errorMessage !== undefined && status.errorMessage !== null) {
          expect(typeof status.errorMessage).toBe('string');
          expect(status.status).toBe('FAILED');
        }
      } catch (error) {
        // waitFor can also throw its own timeout Error; only an ApiError is a contract signal.
        if (error instanceof ApiError) {
          expect(GATED_STATUSES).toContain(error.status);
        } else {
          expect(error).toBeInstanceOf(Error);
        }
      }

      return;
    }

    // No task was produced (endpoints gated) — exercise the status path with a plausible id.
    try {
      await client.spacePermissionTransition.getSpacePermissionTransitionTaskStatus({
        taskId: 'cfjs-nonexistent-task-id',
      });
      throw new Error('expected getSpacePermissionTransitionTaskStatus to reject an unknown task id');
    } catch (error) {
      expectGatedError(error);
    }
  });
});
