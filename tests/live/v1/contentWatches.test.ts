import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestPage, createTestSpace } from '../setup/fixtures';

/**
 * Watches are v1-only. Every write here targets the calling user on a disposable
 * fixture page or space, so a run never subscribes anyone else to anything.
 */

const tracker = new ResourceTracker();

let client: V1Client;
let pageId: string;
let spaceKey: string;
let accountId: string;

beforeAll(async () => {
  client = getV1Client();

  const space = await createTestSpace(tracker, 'watch');
  const page = await createTestPage(tracker, space.id);

  spaceKey = space.key;
  pageId = String(page.id);
  accountId = (await client.users.getCurrentUser({})).accountId!;
}, 100_000);

afterAll(async () => {
  await tracker.cleanup();
}, 100_000);

describe('Confluence Cloud v1 — contentWatches listings (live)', () => {
  it('returns a typed page of page watchers', async () => {
    const watches = await client.contentWatches.getWatchesForPage({ id: pageId });

    expect(Array.isArray(watches.results)).toBe(true);
    expect(typeof watches.size).toBe('number');

    for (const watch of watches.results) {
      expect(watch).toMatchObject({ type: expect.any(String) });
    }
  });

  it('returns a typed page of space watchers', async () => {
    const watches = await client.contentWatches.getWatchersForSpace({ spaceKey });

    expect(Array.isArray(watches.results)).toBe(true);
  });

  // Despite the name, getWatchesForSpace is /content/{id}/notification/created — a
  // *content* endpoint. Handing it a space key 500s. Pinned so the naming does not
  // mislead the next reader the way it misled this suite.
  it('getWatchesForSpace takes a content id, not a space key, whatever its name says', async () => {
    const watches = await client.contentWatches.getWatchesForSpace({ id: pageId });

    expect(Array.isArray(watches.results)).toBe(true);
  });

  it('honors `limit` on page watchers', async () => {
    const watches = await client.contentWatches.getWatchesForPage({ id: pageId, limit: 1 });

    expect(watches.results.length).toBeLessThanOrEqual(1);
  });

  it('rejects an unknown page id with an ApiError', async () => {
    const error = await client.contentWatches.getWatchesForPage({ id: '0' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — content watch lifecycle (live, round-trip)', () => {
  // Creating a page subscribes you to it, so the fixture starts out watched — this
  // suite tears that down first rather than assuming a clean slate.
  it('reports the creator as already watching the page they made', async () => {
    const status = await client.contentWatches.getContentWatchStatus({ contentId: pageId, accountId });

    expect(status.watching).toBe(true);
  });

  it('removes the watch, and the status flips to not watching', async () => {
    await client.contentWatches.removeContentWatcher({ contentId: pageId, accountId });

    const status = await client.contentWatches.getContentWatchStatus({ contentId: pageId, accountId });

    expect(status.watching).toBe(false);
  });

  it('adds a watcher back, and the status flips to watching', async () => {
    await client.contentWatches.addContentWatcher({ contentId: pageId, accountId });

    const status = await client.contentWatches.getContentWatchStatus({ contentId: pageId, accountId });

    expect(status.watching).toBe(true);
  });

  it('surfaces the watcher in the page listing', async () => {
    const watches = await client.contentWatches.getWatchesForPage({ id: pageId });
    const accountIds = watches.results.map(watch => watch.watcher?.accountId).filter(Boolean);

    expect(accountIds).toContain(accountId);
  });

  it('removes the watcher again, leaving the page unwatched', async () => {
    await client.contentWatches.removeContentWatcher({ contentId: pageId, accountId });

    const status = await client.contentWatches.getContentWatchStatus({ contentId: pageId, accountId });

    expect(status.watching).toBe(false);
  });
});

describe('Confluence Cloud v1 — space watch lifecycle (live, round-trip)', () => {
  it('adds and removes a space watcher, with the status tracking both', async () => {
    const before = await client.contentWatches.isWatchingSpace({ spaceKey, accountId });

    expect(before.watching).toBe(false);

    await client.contentWatches.addSpaceWatcher({ spaceKey, accountId });

    const during = await client.contentWatches.isWatchingSpace({ spaceKey, accountId });

    expect(during.watching).toBe(true);

    await client.contentWatches.removeSpaceWatch({ spaceKey, accountId });

    const after = await client.contentWatches.isWatchingSpace({ spaceKey, accountId });

    expect(after.watching).toBe(false);
  });
});

describe('Confluence Cloud v1 — label watch lifecycle (live, round-trip)', () => {
  // A label only exists while some content carries it, so it has to be put on the
  // fixture page before anything can watch it — watching a free-floating name is a
  // 403 "Requested label doesn't exist", not a 404.
  it('adds and removes a label watcher, with the status tracking both', async () => {
    const labelName = 'cfjs-watched-label';

    await client.contentLabels.addLabelsToContent({ id: pageId, body: [{ prefix: 'global', name: labelName }] });

    const before = await client.contentWatches.isWatchingLabel({ labelName, accountId });

    expect(before.watching).toBe(false);

    await client.contentWatches.addLabelWatcher({ labelName, accountId });

    const during = await client.contentWatches.isWatchingLabel({ labelName, accountId });

    expect(during.watching).toBe(true);

    await client.contentWatches.removeLabelWatcher({ labelName, accountId });

    const after = await client.contentWatches.isWatchingLabel({ labelName, accountId });

    expect(after.watching).toBe(false);
  });
});
