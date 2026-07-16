import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { createV2Client } from '#/v2';
import { getV2Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestSpace, createTestPage } from '../setup/fixtures';
import { testName } from '../helpers/naming';
import { waitFor } from '../helpers/poll';

/**
 * Live integration suite for the Confluence Cloud v2 `ancestors` API
 * (`getPageAncestors`, `getWhiteboardAncestors`, `getDatabaseAncestors`,
 * `getSmartLinkAncestors`, `getFolderAncestors`).
 *
 * The suite builds a real two-level page tree — a PARENT page with a single CHILD
 * page (`createPage` with a body `parentId`) — and verifies the *contract* of the
 * ancestor chain: querying the CHILD's ancestors returns the PARENT, each ancestor
 * is minimally typed per the `Ancestor` model (`id` numeric string, `type` from
 * the `AncestorType` enum), and the parent's entry carries `type: 'page'`.
 *
 * Coverage notes:
 *   - DEEP on pages: `getPageAncestors` is asserted against the live parent/child.
 *   - whiteboard/database/smart-link/folder ancestors have no cheap fixture on a
 *     standard Cloud site, so each is called with a real page id (wrong content
 *     type) purely to exercise typing + URL/param serialization; a correct
 *     response is a typed empty page or a typed 404/400 ApiError.
 *
 * The page tree is eventually consistent, so the ancestor read polls via
 * {@link waitFor}.
 */

const ANCESTOR_TYPES = ['page', 'whiteboard', 'database', 'embed', 'folder'] as const;

let client: ReturnType<typeof createV2Client>;
const tracker = new ResourceTracker();

let space: Awaited<ReturnType<typeof createTestSpace>>;
let parent: Awaited<ReturnType<typeof createTestPage>>;
let child: Awaited<ReturnType<typeof createTestPage>>;

/**
 * Assert that an ancestor listing called with a wrong-type id either resolves to
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
  client = getV2Client();
  space = await createTestSpace(tracker);
  parent = await createTestPage(tracker, space.id, { title: testName('ancestors-parent') });
  child = await createTestPage(tracker, space.id, {
    title: testName('ancestors-child'),
    parentId: String(parent.id),
  });
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — ancestors.getPageAncestors (live, deep)', () => {
  it('returns the parent page in the child page ancestor chain, typed', async () => {
    const page = await waitFor(
      () => client.ancestors.getPageAncestors({ id: Number(child.id) }),
      result => (result.results ?? []).some(a => a.id === parent.id),
    );

    const ancestors = page.results ?? [];
    expect(ancestors.length).toBeGreaterThan(0);

    // Every ancestor is minimally typed per the `Ancestor` model.
    ancestors.forEach(ancestor => {
      expect(typeof ancestor.id).toBe('string');
      expect(ancestor.id).toBeTruthy();
      expect(ANCESTOR_TYPES).toContain(ancestor.type);
    });

    const found = ancestors.find(a => a.id === parent.id);
    expect(found).toBeDefined();
    expect(found!.id).toBe(parent.id);
    expect(found!.type).toBe('page');
  });

  it('honors `limit` — never returns more ancestors than requested', async () => {
    const page = await client.ancestors.getPageAncestors({ id: Number(child.id), limit: 1 });

    expect((page.results ?? []).length).toBeLessThanOrEqual(1);
  });

  it('rejects a non-existent page id with a 404 ApiError', async () => {
    let caught: unknown;

    try {
      await client.ancestors.getPageAncestors({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — ancestors — non-page content-tree nodes (gated-graceful)', () => {
  it('getWhiteboardAncestors — typed empty page or typed ApiError', async () => {
    await expectEmptyOrApiError(() => client.ancestors.getWhiteboardAncestors({ id: Number(child.id) }));
  });

  it('getDatabaseAncestors — typed empty page or typed ApiError', async () => {
    await expectEmptyOrApiError(() => client.ancestors.getDatabaseAncestors({ id: Number(child.id) }));
  });

  it('getSmartLinkAncestors — typed empty page or typed ApiError', async () => {
    await expectEmptyOrApiError(() => client.ancestors.getSmartLinkAncestors({ id: Number(child.id) }));
  });

  it('getFolderAncestors — typed empty page or typed ApiError', async () => {
    await expectEmptyOrApiError(() => client.ancestors.getFolderAncestors({ id: Number(child.id) }));
  });
});
