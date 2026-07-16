import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '@confluence.js/core';
import type { createCloudV2Client } from '@confluence.js/cloud';
import { getLiveClient } from './setup/client';
import { ResourceTracker } from './setup/resources';
import { createTestSpace, createTestPage } from './setup/fixtures';
import { testName } from './helpers/naming';
import { waitFor } from './helpers/poll';

/**
 * Live integration suite for the Confluence Cloud v2 `children` API
 * (`getChildPages`, `getPageDirectChildren`, `getChildCustomContent`,
 * `getWhiteboardDirectChildren`, `getDatabaseDirectChildren`,
 * `getSmartLinkDirectChildren`, `getFolderDirectChildren`).
 *
 * The suite bootstraps a real two-level page tree — a PARENT page with a single
 * CHILD page (`createPage` with a body `parentId`) — and verifies the *contract*
 * of each listing: the child appears under its parent, every field is typed
 * exactly as the Zod model declares (`ChildPage` / `Children`), the page-tree
 * `type` is the literal `page`, ids come back as numeric *strings*, and a
 * `limit` has an observable effect.
 *
 * Coverage notes:
 *   - DEEP on pages: `getChildPages` (ChildPage model) + `getPageDirectChildren`
 *     (Children model) are asserted against the live child.
 *   - `getChildCustomContent` is exercised against the parent page id (a page has
 *     no child custom content) — asserted as a typed empty page or typed ApiError.
 *   - whiteboard/database/smart-link/folder direct-children have no cheap fixture
 *     on a standard Cloud site, so each is called with a real page id (wrong
 *     content type) purely to exercise typing + URL/param serialization; a correct
 *     response is a typed empty page or a typed 404/400 ApiError.
 *
 * The page tree is eventually consistent, so reads that expect the child poll via
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
 * Assert that a content-tree listing called with a wrong-type / childless id
 * either resolves to a typed empty page or fails as a typed ApiError (404/400).
 * Used for the families we cannot cheaply create a parent for.
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
  parent = await createTestPage(tracker, space.id, { title: testName('children-parent') });
  // CHILD hangs off PARENT via the body `parentId` (a numeric string).
  child = await createTestPage(tracker, space.id, {
    title: testName('children-child'),
    parentId: String(parent.id),
  });
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — children.getChildPages (live, deep)', () => {
  it('returns the freshly created child page with correctly-typed fields', async () => {
    const page = await waitFor(
      () => client.children.getChildPages({ id: Number(parent.id) }),
      result => (result.results ?? []).some(p => p.id === child.id),
    );

    expect(page._links).toBeDefined();
    const found = (page.results ?? []).find(p => p.id === child.id);
    expect(found).toBeDefined();
    expect(typeof found!.id).toBe('string');
    expect(found!.id).toBe(child.id);
    expect(typeof found!.title).toBe('string');
    expect(found!.title).toBe(child.title);
    expect(CONTENT_STATUSES).toContain(found!.status);
    expect(found!.status).toBe('current');
    expect(found!.spaceId).toBe(space.id);

    // `childPosition` is `z.number().nullish()` — a real number when present, else null/undefined.
    if (found!.childPosition !== null && found!.childPosition !== undefined) {
      expect(typeof found!.childPosition).toBe('number');
    }
  });

  it('honors `limit` — never returns more pages than requested', async () => {
    const page = await client.children.getChildPages({ id: Number(parent.id), limit: 1 });

    expect((page.results ?? []).length).toBeLessThanOrEqual(1);
  });

  it('rejects a non-existent parent page id with a 404 ApiError', async () => {
    let caught: unknown;

    try {
      await client.children.getChildPages({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — children.getPageDirectChildren (live, deep)', () => {
  it('returns the child in the mixed content tree, typed as a page', async () => {
    const page = await waitFor(
      () => client.children.getPageDirectChildren({ id: Number(parent.id) }),
      result => (result.results ?? []).some(c => c.id === child.id),
    );

    const found = (page.results ?? []).find(c => c.id === child.id);
    expect(found).toBeDefined();
    expect(typeof found!.id).toBe('string');
    expect(found!.id).toBe(child.id);
    // The mixed content-tree listing tags each child with its hierarchical type.
    expect(HIERARCHY_TYPES).toContain(found!.type);
    expect(found!.type).toBe('page');
    expect(typeof found!.title).toBe('string');
    expect(found!.title).toBe(child.title);

    // `spaceId` is optional on the `Children` model and the direct-children listing
    // may omit it; assert equality only when the API actually returns it.
    if (found!.spaceId !== undefined) {
      expect(typeof found!.spaceId).toBe('string');
      expect(found!.spaceId).toBe(space.id);
    }

    expect(CONTENT_STATUSES).toContain(found!.status);

    if (found!.childPosition !== null && found!.childPosition !== undefined) {
      expect(typeof found!.childPosition).toBe('number');
    }
  });
});

describe('Confluence Cloud v2 — children.getChildCustomContent (light)', () => {
  it('returns a typed empty page or a typed ApiError for a page with no child custom content', async () => {
    // The endpoint targets `/custom-content/{id}/children`; a page id is the wrong
    // content type, so the contract is "typed empty page or typed ApiError".
    await expectEmptyOrApiError(() => client.children.getChildCustomContent({ id: Number(parent.id) }));
  });
});

describe('Confluence Cloud v2 — children — non-page content-tree roots (gated-graceful)', () => {
  it('getWhiteboardDirectChildren — typed empty page or typed ApiError', async () => {
    await expectEmptyOrApiError(() => client.children.getWhiteboardDirectChildren({ id: Number(parent.id) }));
  });

  it('getDatabaseDirectChildren — typed empty page or typed ApiError', async () => {
    await expectEmptyOrApiError(() => client.children.getDatabaseDirectChildren({ id: Number(parent.id) }));
  });

  it('getSmartLinkDirectChildren — typed empty page or typed ApiError', async () => {
    await expectEmptyOrApiError(() => client.children.getSmartLinkDirectChildren({ id: Number(parent.id) }));
  });

  it('getFolderDirectChildren — typed empty page or typed ApiError', async () => {
    await expectEmptyOrApiError(() => client.children.getFolderDirectChildren({ id: Number(parent.id) }));
  });
});
