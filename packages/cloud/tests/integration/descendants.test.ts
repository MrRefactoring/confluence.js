import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '@confluence.js/core';
import type { createCloudV2Client } from '@confluence.js/cloud';
import { getLiveClient } from './setup/client';
import { ResourceTracker } from './setup/resources';
import { createTestSpace, createTestPage } from './setup/fixtures';
import { testName } from './helpers/naming';
import { waitFor } from './helpers/poll';

/**
 * Live integration suite for the Confluence Cloud v2 `descendants` API
 * (`getPageDescendants`, `getWhiteboardDescendants`, `getDatabaseDescendants`,
 * `getSmartLinkDescendants`, `getFolderDescendants`).
 *
 * The suite builds a real two-level page tree — a PARENT page with a single CHILD
 * page (`createPage` with a body `parentId`) — and verifies the *contract* of the
 * descendant tree: querying the PARENT's descendants returns the CHILD, each
 * descendant is typed per the `Descendants` model (`id` numeric string, hierarchy
 * `type`, `parentId`, `depth`), and the child entry reports `type: 'page'`,
 * `parentId === parent.id`, and `depth === 1` (a direct child).
 *
 * Coverage notes:
 *   - DEEP on pages: `getPageDescendants` is asserted against the live parent/child.
 *   - whiteboard/database/smart-link/folder descendants have no cheap fixture on a
 *     standard Cloud site, so each is called with a real page id (wrong content
 *     type) purely to exercise typing + URL/param serialization; a correct
 *     response is a typed empty page or a typed 404/400 ApiError.
 *
 * The page tree is eventually consistent, so the descendant read polls via
 * {@link waitFor}.
 */

const CONTENT_STATUSES = ['current', 'archived'] as const;
const HIERARCHY_TYPES = ['page', 'whiteboard', 'database', 'embed', 'folder'] as const;

let client: ReturnType<typeof createCloudV2Client>;
const tracker = new ResourceTracker();

let space: Awaited<ReturnType<typeof createTestSpace>>;
let parent: Awaited<ReturnType<typeof createTestPage>>;
let child: Awaited<ReturnType<typeof createTestPage>>;

/**
 * Assert that a descendant listing called with a wrong-type id either resolves to
 * a typed empty page or fails as a typed ApiError (404/400).
 */
async function expectEmptyOrApiError(call: () => Promise<{ results?: unknown[] }>): Promise<void> {
  try {
    const page = await call();
    expect(Array.isArray(page.results ?? [])).toBe(true);
    expect(page.results ?? []).toHaveLength(0);
  } catch (error) {
    expect(error).toBeInstanceOf(ApiError);
    expect([400, 404]).toContain((error as ApiError).status);
  }
}

beforeAll(async () => {
  client = getLiveClient();
  space = await createTestSpace(tracker);
  parent = await createTestPage(tracker, space.id, { title: testName('descendants-parent') });
  child = await createTestPage(tracker, space.id, {
    title: testName('descendants-child'),
    parentId: String(parent.id),
  });
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — descendants.getPageDescendants (live, deep)', () => {
  it('returns the child page in the parent descendant tree, fully typed', async () => {
    const page = await waitFor(
      () => client.descendants.getPageDescendants({ id: Number(parent.id) }),
      result => (result.results ?? []).some(d => d.id === child.id),
    );

    const found = (page.results ?? []).find(d => d.id === child.id);
    expect(found).toBeDefined();
    expect(typeof found!.id).toBe('string');
    expect(found!.id).toBe(child.id);
    expect(HIERARCHY_TYPES).toContain(found!.type);
    expect(found!.type).toBe('page');
    expect(typeof found!.title).toBe('string');
    expect(found!.title).toBe(child.title);
    // The descendant carries the id of its immediate parent and its tree depth.
    expect(found!.parentId).toBe(parent.id);
    expect(typeof found!.depth).toBe('number');
    expect(found!.depth).toBe(1);
    expect(CONTENT_STATUSES).toContain(found!.status);

    if (found!.childPosition !== null && found!.childPosition !== undefined) {
      expect(typeof found!.childPosition).toBe('number');
    }
  });

  it('honors `depth` — a depth of 1 still surfaces the direct child', async () => {
    const page = await waitFor(
      () => client.descendants.getPageDescendants({ id: Number(parent.id), depth: 1 }),
      result => (result.results ?? []).some(d => d.id === child.id),
    );

    const found = (page.results ?? []).find(d => d.id === child.id);
    expect(found).toBeDefined();
    expect(found!.depth).toBe(1);
  });

  it('rejects a non-existent page id with a 404 ApiError', async () => {
    let caught: unknown;

    try {
      await client.descendants.getPageDescendants({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — descendants — non-page content-tree roots (gated-graceful)', () => {
  it('getWhiteboardDescendants — typed empty page or typed ApiError', async () => {
    await expectEmptyOrApiError(() => client.descendants.getWhiteboardDescendants({ id: Number(parent.id) }));
  });

  it('getDatabaseDescendants — typed empty page or typed ApiError', async () => {
    await expectEmptyOrApiError(() => client.descendants.getDatabaseDescendants({ id: Number(parent.id) }));
  });

  it('getSmartLinkDescendants — typed empty page or typed ApiError', async () => {
    await expectEmptyOrApiError(() => client.descendants.getSmartLinkDescendants({ id: Number(parent.id) }));
  });

  it('getFolderDescendants — typed empty page or typed ApiError', async () => {
    await expectEmptyOrApiError(() => client.descendants.getFolderDescendants({ id: Number(parent.id) }));
  });
});
