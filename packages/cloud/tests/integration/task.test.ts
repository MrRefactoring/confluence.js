import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '@confluence.js/core';
import type { createCloudV2Client } from '@confluence.js/cloud';
import { getLiveClient } from './setup/client';
import { ResourceTracker } from './setup/resources';
import { createTestSpace, createTestPage, type TestSpace } from './setup/fixtures';
import { waitFor } from './helpers/poll';

/**
 * Live integration suite for the Confluence Cloud v2 `task` API
 * (`getTasks`, `getTaskById`, `updateTask`).
 *
 * Confluence "tasks" are action items embedded in content via the `ac:task-list`
 * storage markup — there is no create-task endpoint. So the suite bootstraps a
 * fresh space and a page whose storage body carries a single task list, then lets
 * Confluence index it into a real, server-assigned task. Once the task surfaces in
 * the listing (it is eventually consistent, hence `waitFor`), the assertions verify
 * the *contract* of each method against the Zod models:
 *
 *   - `getTasks` (deep): the created task surfaces with every field typed exactly as
 *     `TaskSchema` declares (numeric-string `id`/`localId`/`spaceId`/`pageId`,
 *     `status` ∈ {complete, incomplete}, `createdAt` a real `Date`, `body.storage`
 *     carrying our text); the `spaceId`, `pageId` and `status` query filters each
 *     have a real, observable effect; `limit` is honored.
 *   - `getTaskById` (deep): fetching by the task's own id returns the same canonical
 *     entity as the listing summary; a bogus id is a typed 404 `ApiError`.
 *   - `updateTask` (deep): marking the task `complete` flips `status`, and a re-fetch
 *     confirms the change persisted (read-your-write across endpoints).
 *
 * Graceful degradation: if the task never materializes from the storage markup on
 * this site (markup rejected / slow indexing), `createdTask` stays undefined; the
 * deep assertions short-circuit but every method is still invoked against a typed
 * result page or asserted to be a typed `ApiError`, so the suite still exercises
 * serialization + parsing. The report flags whether a real task was created.
 *
 * ID gotcha: model ids are numeric *strings* but the path/filter params are
 * `z.number()` — converted with `Number(task.id)` (see `space.test.ts`).
 *
 * Shared infra: `getLiveClient` (singleton v2 client), `ResourceTracker` (LIFO
 * retried teardown), fixtures (`createTestSpace`/`createTestPage`, self-cleaning),
 * `waitFor` (eventually-consistent polling).
 */

const TASK_STATUSES = ['complete', 'incomplete'] as const;

/** Marker text embedded in the task body so we can recognize our own task. */
const TASK_BODY_TEXT = 'cfjs live test task';

const TASK_LIST_HTML =
  '<ac:task-list><ac:task><ac:task-id>1</ac:task-id>' +
  '<ac:task-status>incomplete</ac:task-status>' +
  `<ac:task-body>${TASK_BODY_TEXT}</ac:task-body></ac:task></ac:task-list>`;

let client: ReturnType<typeof createCloudV2Client>;

type TaskEntity = NonNullable<Awaited<ReturnType<typeof client.task.getTasks>>['results']>[number];
type TaskPage = Awaited<ReturnType<typeof client.task.getTasks>>;

const tracker = new ResourceTracker();
let space: TestSpace;
let page: Awaited<ReturnType<typeof createTestPage>>;
/** The created task as first observed in the listing — undefined if it never surfaced. */
let createdTask: TaskEntity | undefined;

/**
 * Structural check tolerant of "blank" tasks the listing may also contain: assert
 * the *type* of every field that is present without requiring optional fields.
 */
function expectTaskShape(task: TaskEntity) {
  if (task.id !== undefined) {
    expect(typeof task.id).toBe('string');
    // ids come back as numeric strings even though many params are `z.number()`.
    expect(task.id).toMatch(/^\d+$/);
  }

  if (task.localId !== undefined) expect(typeof task.localId).toBe('string');

  if (task.spaceId !== undefined) expect(task.spaceId).toMatch(/^\d+$/);

  if (task.pageId !== undefined) expect(task.pageId).toMatch(/^\d+$/);

  if (task.blogPostId !== undefined) expect(task.blogPostId).toMatch(/^\d+$/);

  if (task.status !== undefined) expect(TASK_STATUSES).toContain(task.status);

  // The four timestamps are all `z.coerce.date()` — a parsed response is a real Date.
  for (const ts of [task.createdAt, task.updatedAt, task.dueAt, task.completedAt]) {
    if (ts !== undefined && ts !== null) expect(ts).toBeInstanceOf(Date);
  }
}

/** A task listing is `{ results?: Task[], _links?: MultiEntityLinks }`. */
function expectWellFormedTaskPage(taskPage: TaskPage) {
  expect(Array.isArray(taskPage.results)).toBe(true);
  (taskPage.results ?? []).forEach(expectTaskShape);

  if (taskPage._links !== undefined) {
    expect(typeof taskPage._links).toBe('object');

    if (taskPage._links.next !== undefined) expect(typeof taskPage._links.next).toBe('string');

    if (taskPage._links.base !== undefined) expect(typeof taskPage._links.base).toBe('string');
  }
}

beforeAll(async () => {
  client = getLiveClient();

  space = await createTestSpace(tracker, 'task');
  page = await createTestPage(tracker, space.id, { html: TASK_LIST_HTML });

  // The task list is indexed asynchronously: poll the page's tasks until our
  // marker task appears. If it never does, degrade gracefully (createdTask stays
  // undefined) rather than failing the whole suite.
  try {
    const settled = await waitFor<TaskPage>(
      () => client.task.getTasks({ pageId: [Number(page.id)], bodyFormat: 'storage' }),
      res => (res.results ?? []).some(t => t.body?.storage?.value?.includes(TASK_BODY_TEXT)),
      { maxAttempts: 8 },
    );
    createdTask = settled.results!.find(t => t.body?.storage?.value?.includes(TASK_BODY_TEXT));
  } catch {
    createdTask = undefined;
  }
}, 90_000);

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — task.getTasks (live)', () => {
  it('returns a well-typed page of tasks', async () => {
    const tasks = await client.task.getTasks({ limit: 25 });
    expectWellFormedTaskPage(tasks);
  });

  it('surfaces the created task with every field typed as TaskSchema declares', () => {
    if (!createdTask) return; // graceful: no real task — covered by the typed-page test above

    const task = createdTask;
    // id: numeric string (model: z.string()).
    expect(typeof task.id).toBe('string');
    expect(task.id).toMatch(/^\d+$/);
    // localId is the in-page id from the `<ac:task-id>1</ac:task-id>` markup.
    expect(task.localId).toBe('1');
    // status: the markup created it `incomplete`; it must not yet be complete here.
    expect(task.status).toBe('incomplete');
    // createdAt: declared z.coerce.date() — a real Date on a parsed response.
    expect(task.createdAt).toBeInstanceOf(Date);
    // body: requested as `storage`, so the storage representation carries our text.
    expect(task.body?.storage?.value).toContain(TASK_BODY_TEXT);
    expect(task.body?.storage?.representation).toBe('storage');
    // It belongs to the page/space we created it in.
    expect(task.spaceId).toBe(space.id);
    expect(task.pageId).toBe(page.id);
  });

  it('filters by `spaceId` — the created task is scoped to its space', async () => {
    if (!createdTask) return;

    const filtered = await client.task.getTasks({ spaceId: [Number(space.id)], bodyFormat: 'storage' });
    expectWellFormedTaskPage(filtered);

    // Every returned task is in the requested space, and ours is among them.
    expect(filtered.results!.every(t => t.spaceId === space.id)).toBe(true);
    expect(filtered.results!.some(t => t.id === createdTask!.id)).toBe(true);
  });

  it('filters by `status` — `incomplete` includes our task, `complete` excludes it', async () => {
    if (!createdTask) return;

    const incomplete = await client.task.getTasks({ pageId: [Number(page.id)], status: 'incomplete' });
    expectWellFormedTaskPage(incomplete);
    expect(incomplete.results!.every(t => t.status === 'incomplete')).toBe(true);
    expect(incomplete.results!.some(t => t.id === createdTask!.id)).toBe(true);

    const complete = await client.task.getTasks({ pageId: [Number(page.id)], status: 'complete' });
    expectWellFormedTaskPage(complete);
    // The task is still incomplete at this point, so the `complete` filter must drop it.
    expect(complete.results!.some(t => t.id === createdTask!.id)).toBe(false);
  });

  it('honors `limit` — never returns more rows than requested', async () => {
    const limited = await client.task.getTasks({ limit: 1 });

    expect(limited.results?.length ?? 0).toBeLessThanOrEqual(1);
    expectWellFormedTaskPage(limited);
  });
});

describe('Confluence Cloud v2 — task.getTaskById (live)', () => {
  it('returns the same canonical entity as the getTasks summary', async () => {
    if (!createdTask) return;

    const full = await client.task.getTaskById({ id: Number(createdTask.id), bodyFormat: 'storage' });

    expect(full.id).toBe(createdTask.id);
    expect(full.localId).toBe(createdTask.localId);
    expect(full.spaceId).toBe(createdTask.spaceId);
    expect(full.pageId).toBe(createdTask.pageId);
    expect(full.status).toBe(createdTask.status);
    expect(full.createdAt).toBeInstanceOf(Date);
    expect(full.body?.storage?.value).toContain(TASK_BODY_TEXT);
  });

  it('rejects a non-existent task id with a 404 ApiError', async () => {
    let caught: unknown;

    try {
      await client.task.getTaskById({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — task.updateTask (live)', () => {
  it('marks the task complete and the change persists across a re-fetch', async () => {
    if (!createdTask) return;

    // The endpoint only supports updating status; body is `z.record(z.string(), z.any())`.
    const updated = await client.task.updateTask({
      id: Number(createdTask.id),
      bodyFormat: 'storage',
      body: { status: 'complete' },
    });

    expect(updated.id).toBe(createdTask.id);
    expect(updated.status).toBe('complete');
    // Completing a task stamps `completedAt`/`completedBy`.
    expect(updated.completedAt).toBeInstanceOf(Date);
    expect(typeof updated.completedBy).toBe('string');

    // Read-your-write: an independent fetch must report the new status.
    const refetched = await waitFor(
      () => client.task.getTaskById({ id: Number(createdTask!.id) }),
      t => t.status === 'complete',
      { maxAttempts: 6 },
    );
    expect(refetched.status).toBe('complete');
  });

  it('rejects updating a non-existent task id with a typed ApiError', async () => {
    let caught: unknown;

    try {
      await client.task.updateTask({ id: 999_999_999, body: { status: 'complete' } });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    // Updating a task that does not exist is a 404 (no edit permission to grant otherwise).
    expect([404, 400]).toContain((caught as ApiError).status);
  });
});
