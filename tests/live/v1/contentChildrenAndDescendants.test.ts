import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client, getV2Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestPage, createTestSpace } from '../setup/fixtures';
import { testName } from '../helpers/naming';
import { waitFor } from '../helpers/poll';

/**
 * Descendants, move and copy. v2 covers `children`/`descendants` reads, but page
 * *move* and *copy* live only here.
 *
 * The fixture is a three-level tree (root → child → grandchild) inside a
 * disposable space, so depth filtering has something real to filter.
 */

const tracker = new ResourceTracker();

let client: V1Client;
let spaceId: string;
let rootId: string;
let childId: string;
let grandchildId: string;

beforeAll(async () => {
  client = getV1Client();

  const space = await createTestSpace(tracker, 'tree');

  spaceId = space.id;

  const root = await createTestPage(tracker, spaceId, { title: testName('tree-root') });
  const child = await createTestPage(tracker, spaceId, { title: testName('tree-child'), parentId: String(root.id) });
  const grandchild = await createTestPage(tracker, spaceId, {
    title: testName('tree-grandchild'),
    parentId: String(child.id),
  });

  rootId = String(root.id);
  childId = String(child.id);
  grandchildId = String(grandchild.id);
}, 120_000);

afterAll(async () => {
  await tracker.cleanup();
}, 120_000);

describe('Confluence Cloud v1 — getContentDescendants (live)', () => {
  it('returns the typed descendant map for the root', async () => {
    const descendants = await client.contentChildrenAndDescendants.getContentDescendants({ id: rootId });

    expect(descendants).toBeTypeOf('object');
  });

  it('honors `expand` for pages', async () => {
    const descendants = await client.contentChildrenAndDescendants.getContentDescendants({
      id: rootId,
      expand: ['page'],
    });

    const ids = descendants.page?.results?.map(page => String(page.id)) ?? [];

    expect(ids).toEqual(expect.arrayContaining([childId, grandchildId]));
  });

  it('rejects an unknown content id with an ApiError', async () => {
    const error = await client.contentChildrenAndDescendants.getContentDescendants({ id: '0' }).catch(e => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — getDescendantsOfType (live)', () => {
  it('returns every page descendant of the root, at any depth', async () => {
    const descendants = await client.contentChildrenAndDescendants.getDescendantsOfType({
      id: rootId,
      type: 'page',
    });
    const ids = descendants.results.map(page => String(page.id));

    expect(ids).toEqual(expect.arrayContaining([childId, grandchildId]));
  });

  // `depth` is declared `enum: ['all', 'root', '<any positive integer …>']` in the
  // spec — the placeholder is prose, not a value. The generator drops such enums,
  // so `depth` is a plain string and the numeric depths the API documents are
  // reachable. This test is the reason that matters: 'root' must exclude the
  // grandchild that 'all' includes.
  it('honors `depth: root` — immediate children only, excluding the grandchild', async () => {
    const descendants = await client.contentChildrenAndDescendants.getDescendantsOfType({
      id: rootId,
      type: 'page',
      depth: 'root',
    });
    const ids = descendants.results.map(page => String(page.id));

    expect(ids).toContain(childId);
    expect(ids).not.toContain(grandchildId);
  });

  it('accepts a numeric depth, which the spec enum would have made unexpressible', async () => {
    const descendants = await client.contentChildrenAndDescendants.getDescendantsOfType({
      id: rootId,
      type: 'page',
      depth: '1',
    });
    const ids = descendants.results.map(page => String(page.id));

    expect(ids).toContain(childId);
    expect(ids).not.toContain(grandchildId);
  });

  it('honors `limit`', async () => {
    const descendants = await client.contentChildrenAndDescendants.getDescendantsOfType({
      id: rootId,
      type: 'page',
      limit: 1,
    });

    expect(descendants.results.length).toBeLessThanOrEqual(1);
  });

  it('rejects an unknown content id with an ApiError', async () => {
    const error = await client.contentChildrenAndDescendants
      .getDescendantsOfType({ id: '0', type: 'page' })
      .catch(e => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — movePage (live, round-trip)', () => {
  it('appends a page under a new parent, and v2 reports the new parent', async () => {
    const v2 = getV2Client();
    const moved = await createTestPage(tracker, spaceId, { title: testName('tree-movable') });
    const movedId = String(moved.id);

    await client.contentChildrenAndDescendants.movePage({
      pageId: movedId,
      position: 'append',
      targetId: childId,
    });

    const page = await waitFor(
      () => v2.page.getPageById({ id: Number(movedId) }),
      value => String(value.parentId) === childId,
    );

    expect(String(page.parentId)).toBe(childId);
  });

  it('rejects an unknown target with an ApiError', async () => {
    const error = await client.contentChildrenAndDescendants
      .movePage({ pageId: grandchildId, position: 'append', targetId: '0' })
      .catch(e => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — copyPage (live, round-trip)', () => {
  it('copies a single page into the same space under a new title', async () => {
    const title = testName('tree-copy');
    const copy = await client.contentChildrenAndDescendants.copyPage({
      id: grandchildId,
      copyAttachments: false,
      copyPermissions: false,
      copyProperties: false,
      copyLabels: false,
      copyCustomContents: false,
      destination: { type: 'parent_page', value: rootId },
      pageTitle: title,
    });

    expect(copy.title).toBe(title);

    const copyId = String(copy.id);

    tracker.defer(async () => {
      await getV2Client()
        .page.deletePage({ id: Number(copyId) })
        .catch(() => undefined);
    });

    expect(copyId).not.toBe(grandchildId);
  });

  it('rejects an unknown source page with an ApiError', async () => {
    const error = await client.contentChildrenAndDescendants
      .copyPage({
        id: '0',
        destination: { type: 'parent_page', value: rootId },
        pageTitle: testName('tree-copy-nope'),
      })
      .catch(e => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — copyPageHierarchy (live, async task)', () => {
  it('starts a hierarchy copy and returns a long-running task that reaches 100%', async () => {
    const started = await client.contentChildrenAndDescendants
      .copyPageHierarchy({
        id: childId,
        copyAttachments: false,
        copyPermissions: false,
        copyProperties: false,
        copyLabels: false,
        copyCustomContents: false,
        destinationPageId: rootId,
        titleOptions: { prefix: 'cfjs-copy ' },
      })
      .catch((e: unknown) => e);

    // Hierarchy copy is gated on some sites; a typed refusal is an acceptable answer.
    if (started instanceof ApiError) {
      expect([400, 403, 404]).toContain(started.status);

      return;
    }

    const taskId = (started as { id?: string }).id;

    expect(taskId).toBeTruthy();

    // The copy runs asynchronously — the response only hands back a task to poll.
    const task = await waitFor(
      () => client.longRunningTask.getTask({ id: taskId! }),
      value => value.finished === true || value.percentageComplete === 100,
      { maxAttempts: 8, initialDelayMs: 1000 },
    );

    expect(task.percentageComplete).toBe(100);
  }, 120_000);
});
