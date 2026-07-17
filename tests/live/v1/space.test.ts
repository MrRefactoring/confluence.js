import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client, getV2Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { spaceKey, testName } from '../helpers/naming';

/**
 * Space *writes* are one of the odder corners of the pruned v1 spec: `getSpace`
 * and `getSpaces` are gone (v2 owns the reads), but create/update/delete stayed —
 * and v2 has no `deleteSpace` at all, which is why the shared fixture helper
 * deletes its spaces through v1.
 *
 * Every space here is created by this suite, run-scoped and tracked, so cleanup
 * can only ever remove what this run made.
 */

const tracker = new ResourceTracker();

let client: V1Client;

/** Register a space key for deletion, tolerating an already-deleted space. */
function trackSpace(key: string): void {
  tracker.defer(async () => {
    await client.space.deleteSpace({ spaceKey: key }).catch(() => undefined);
  });
}

beforeAll(() => {
  client = getV1Client();
});

afterAll(async () => {
  await tracker.cleanup();
}, 120_000);

describe('Confluence Cloud v1 — space.createSpace (live, round-trip)', () => {
  it('creates a space and v2 can read it back', async () => {
    const key = spaceKey('v1create');
    const created = await client.space.createSpace({ key, name: testName('v1-create') });

    trackSpace(key);

    expect(created.key).toBe(key);
    expect(created.id).toBeTruthy();

    const read = await getV2Client().space.getSpaceById({ id: Number(created.id) });

    expect(read.key).toBe(key);
  }, 60_000);

  it('rejects a duplicate key with an ApiError', async () => {
    const key = spaceKey('v1dup');

    await client.space.createSpace({ key, name: testName('v1-dup') });
    trackSpace(key);

    const error = await client.space.createSpace({ key, name: testName('v1-dup-again') }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  }, 60_000);

  it('rejects a key that is not a valid space key with an ApiError', async () => {
    const error = await client.space
      .createSpace({ key: 'not a valid key!', name: testName('v1-bad-key') })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — space.createPrivateSpace (live, round-trip)', () => {
  it('creates a private space, visible to its creator', async () => {
    const key = spaceKey('v1priv');
    const created = await client.space.createPrivateSpace({ key, name: testName('v1-private') });

    trackSpace(key);

    expect(created.key).toBe(key);

    const read = await getV2Client().space.getSpaceById({ id: Number(created.id) });

    expect(read.key).toBe(key);
  }, 60_000);
});

describe('Confluence Cloud v1 — space.updateSpace (live, round-trip)', () => {
  it('renames a space, and the read-back matches what was written', async () => {
    const key = spaceKey('v1upd');
    const created = await client.space.createSpace({ key, name: testName('v1-update-before') });

    trackSpace(key);

    const renamed = testName('v1-update-after');
    const updated = await client.space.updateSpace({ spaceKey: key, name: renamed });

    expect(updated.name).toBe(renamed);

    const read = await getV2Client().space.getSpaceById({ id: Number(created.id) });

    expect(read.name).toBe(renamed);
  }, 60_000);

  it('rejects an unknown space key with an ApiError', async () => {
    const error = await client.space
      .updateSpace({ spaceKey: 'CFJSNOSUCHSPACE', name: testName('nope') })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — space.deleteSpace (live, round-trip)', () => {
  // Deleting a space is asynchronous — the call hands back a long-running task
  // rather than doing the work. Pinned, because the return type is the only clue
  // and a caller who treats this as done-on-return will race Confluence.
  it('returns a long-running task rather than deleting inline', async () => {
    const key = spaceKey('v1del');

    await client.space.createSpace({ key, name: testName('v1-delete') });

    const task = await client.space.deleteSpace({ spaceKey: key });

    expect(task.id).toBeTruthy();
    expect(typeof task.links).toBe('object');
  }, 60_000);

  it('rejects deleting an unknown space with an ApiError', async () => {
    const error = await client.space.deleteSpace({ spaceKey: 'CFJSNOSUCHSPACE' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});
