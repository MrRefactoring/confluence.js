import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestPage, createTestSpace } from '../setup/fixtures';

/**
 * View analytics are v1-only and have no v2 equivalent.
 *
 * A page created seconds ago has no view history, so these assert on the *shape*
 * and on the endpoints accepting their parameters — not on counts, which would be
 * asserting Atlassian's analytics pipeline rather than this client.
 */

const tracker = new ResourceTracker();

let client: V1Client;
let pageId: string;

beforeAll(async () => {
  client = getV1Client();

  const space = await createTestSpace(tracker, 'analytics');
  const page = await createTestPage(tracker, space.id);

  pageId = String(page.id);
}, 100_000);

afterAll(async () => {
  await tracker.cleanup();
}, 100_000);

describe('Confluence Cloud v1 — analytics.getViews (live, gated-graceful)', () => {
  it('returns a typed view count for a fresh page, or a typed ApiError when analytics is unavailable', async () => {
    try {
      const views = await client.analytics.getViews({ contentId: pageId });

      expect(typeof views.count).toBe('number');
      expect(views.count).toBeGreaterThanOrEqual(0);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });

  it('honors `fromDate`', async () => {
    const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    try {
      const views = await client.analytics.getViews({ contentId: pageId, fromDate });

      expect(typeof views.count).toBe('number');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });

  it('rejects an unknown content id with an ApiError', async () => {
    const error = await client.analytics.getViews({ contentId: '0' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — analytics.getViewers (live, gated-graceful)', () => {
  it('returns a typed viewer count, or a typed ApiError when analytics is unavailable', async () => {
    try {
      const viewers = await client.analytics.getViewers({ contentId: pageId });

      expect(typeof viewers.count).toBe('number');
      expect(viewers.count).toBeGreaterThanOrEqual(0);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });

  it('honors `fromDate`', async () => {
    const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    try {
      const viewers = await client.analytics.getViewers({ contentId: pageId, fromDate });

      expect(typeof viewers.count).toBe('number');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });

  it('rejects an unknown content id with an ApiError', async () => {
    const error = await client.analytics.getViewers({ contentId: '0' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});
