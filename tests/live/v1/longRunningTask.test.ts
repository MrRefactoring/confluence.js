import { describe, it, expect, beforeAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';

/**
 * Long-running tasks back the async v1 operations (page-tree delete, hierarchy
 * copy) and have no v2 equivalent.
 *
 * This suite reads the task list without starting one: a site may legitimately
 * have no tasks in flight, so the listing shape — not its contents — is the
 * subject. The suites that *do* start a task (contentChildrenAndDescendants,
 * experimental) poll it through to completion there.
 */

let client: V1Client;

beforeAll(() => {
  client = getV1Client();
});

describe('Confluence Cloud v1 — longRunningTask.getTasks (live)', () => {
  it('returns a typed page of tasks', async () => {
    const tasks = await client.longRunningTask.getTasks();

    expect(Array.isArray(tasks.results)).toBe(true);
    expect(typeof tasks.size).toBe('number');

    for (const task of tasks.results) {
      expect(task).toMatchObject({ id: expect.any(String) });
      expect(typeof task.percentageComplete).toBe('number');
    }
  });

  it('honors `limit`', async () => {
    const tasks = await client.longRunningTask.getTasks({ limit: 1 });

    expect(tasks.results.length).toBeLessThanOrEqual(1);
  });

  it('accepts `start` for paging', async () => {
    const tasks = await client.longRunningTask.getTasks({ start: 0, limit: 1 });

    expect(Array.isArray(tasks.results)).toBe(true);
  });
});

describe('Confluence Cloud v1 — longRunningTask.getTask (live)', () => {
  it('fetches a task by id when the site has one in flight', async () => {
    const tasks = await client.longRunningTask.getTasks({ limit: 1 });
    const first = tasks.results[0];

    if (!first) return; // No task in flight — nothing to fetch, and that is normal.

    const task = await client.longRunningTask.getTask({ id: first.id! });

    expect(task.id).toBe(first.id);
    expect(typeof task.percentageComplete).toBe('number');
  });

  it('rejects an unknown task id with an ApiError', async () => {
    const error = await client.longRunningTask.getTask({ id: '0' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});
