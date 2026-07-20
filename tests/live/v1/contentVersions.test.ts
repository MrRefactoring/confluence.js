import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestPage, createTestSpace, storageBody } from '../setup/fixtures';
import { getV2Client } from '../setup/client';
import { waitFor } from '../helpers/poll';

/**
 * v1 keeps the version *writes* — restore and delete — while v2 owns the reads
 * (`version.getPageVersions`). Both halves are exercised here: v2 to see the
 * history, v1 to change it.
 *
 * Every test edits a disposable fixture page, so no real history is ever touched.
 */

const tracker = new ResourceTracker();

let client: V1Client;
let pageId: string;

/** Add a version to the fixture page by editing it through v2. */
async function bumpVersion(title: string, html: string): Promise<number> {
  const v2 = getV2Client();
  const current = await v2.page.getPageById({ id: Number(pageId) });
  const next = (current.version?.number ?? 1) + 1;

  await v2.page.updatePage({
    id: Number(pageId),
    body: {
      id: pageId,
      status: 'current',
      title,
      body: storageBody(html),
      version: { number: next },
    },
  });

  return next;
}

beforeAll(async () => {
  client = getV1Client();

  const space = await createTestSpace(tracker, 'versions');
  const page = await createTestPage(tracker, space.id, { html: '<p>v1</p>' });

  pageId = String(page.id);
}, 100_000);

afterAll(async () => {
  await tracker.cleanup();
}, 100_000);

describe('Confluence Cloud v1 — contentVersions.restoreContentVersion (live, round-trip)', () => {
  it('restores an earlier version, which lands as a new version carrying the old body', async () => {
    const v2 = getV2Client();

    await bumpVersion('cfjs versions v2', '<p>second</p>');
    await bumpVersion('cfjs versions v3', '<p>third</p>');

    const restored = await client.contentVersions.restoreContentVersion({
      id: pageId,
      operationKey: 'restore',
      params: { versionNumber: 1, message: 'cfjs restore' },
    });

    expect(typeof restored.number).toBe('number');

    // A restore does not rewind the history — it appends. The restored version is
    // the newest one, and it carries the old body.
    const page = await v2.page.getPageById({ id: Number(pageId), bodyFormat: 'storage' });

    expect(page.version?.number).toBeGreaterThan(3);
    expect(page.body?.storage?.value).toContain('v1');
  });

  it('rejects restoring a version that does not exist with an ApiError', async () => {
    const error = await client.contentVersions
      .restoreContentVersion({
        id: pageId,
        operationKey: 'restore',
        params: { versionNumber: 999, message: 'cfjs nope' },
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });

  it('rejects an unknown content id with an ApiError', async () => {
    const error = await client.contentVersions
      .restoreContentVersion({
        id: '0',
        operationKey: 'restore',
        params: { versionNumber: 1, message: 'cfjs nope' },
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

/** Delete a version, riding out the transient conflict a just-edited page throws. */
async function deleteVersion(versionNumber: number): Promise<void> {
  // Deleting a version right after editing the page races the edit itself:
  // Confluence answers `409 ConflictException: content was being concurrently
  // updated`. The conflict is transient, so retry until the content settles.
  await waitFor(
    () =>
      client.contentVersions
        .deleteContentVersion({ id: pageId, versionNumber })
        .then(() => true)
        .catch((error: unknown) => {
          if (error instanceof ApiError && error.status === 409) return false;

          throw error;
        }),
    deleted => deleted,
    { maxAttempts: 6, initialDelayMs: 800 },
  );
}

describe('Confluence Cloud v1 — contentVersions.deleteContentVersion (live, round-trip)', () => {
  // Version numbers are ordinals, not identities: deleting version 2 of
  // [4,3,2,1] leaves [3,2,1] — everything above the hole slides down to close it.
  // So "delete version N" cannot be checked by asserting N is gone (it usually
  // is not), only by the history getting shorter. This is a real trap: a caller
  // holding version numbers across a delete is silently pointing at other
  // versions afterwards.
  it('shortens the history by one and renumbers the versions above the hole', async () => {
    const v2 = getV2Client();

    await bumpVersion('cfjs versions del-a', '<p>del-a</p>');
    await bumpVersion('cfjs versions del-b', '<p>del-b</p>');

    const current = (await v2.page.getPageById({ id: Number(pageId) })).version!.number!;
    const before = await v2.version.getPageVersions({ id: Number(pageId) });
    const beforeNumbers = before.results?.map(version => version.number!) ?? [];
    const target = beforeNumbers.filter(number => number !== current).sort((a, b) => b - a)[0];

    expect(target).toBeDefined();
    expect(beforeNumbers.length).toBeGreaterThan(1);

    await deleteVersion(target);

    const after = await v2.version.getPageVersions({ id: Number(pageId) });
    const afterNumbers = (after.results?.map(version => version.number!) ?? []).sort((a, b) => a - b);

    expect(afterNumbers).toHaveLength(beforeNumbers.length - 1);
    // Renumbered, not holed: what is left runs 1..N-1 with no gap.
    expect(afterNumbers).toEqual(Array.from({ length: beforeNumbers.length - 1 }, (_, index) => index + 1));
  });

  it('rejects deleting the current version with an ApiError', async () => {
    const v2 = getV2Client();
    const page = await v2.page.getPageById({ id: Number(pageId) });

    const error = await client.contentVersions
      .deleteContentVersion({ id: pageId, versionNumber: page.version!.number! })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });

  it('rejects an unknown version number with an ApiError', async () => {
    const error = await client.contentVersions
      .deleteContentVersion({ id: pageId, versionNumber: 999 })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});
