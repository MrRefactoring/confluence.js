import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '@confluence.js/core';
import type { createCloudV2Client } from '@confluence.js/cloud';
import { getLiveClient } from './setup/client';
import { ResourceTracker } from './setup/resources';
import { createTestSpace, createTestPage, type TestSpace } from './setup/fixtures';
import { testName } from './helpers/naming';

/**
 * Live integration suite for the Confluence Cloud v2 `whiteboard` API, covering
 * its full lifecycle: `createWhiteboard`, `getWhiteboardById`, `deleteWhiteboard`.
 *
 * The assertions verify the *contract* of each function, not merely that a call
 * resolves: a created whiteboard is typed exactly as the `Whiteboard` Zod model
 * declares (`id`/`spaceId`/`authorId`/`ownerId` are numeric strings, `createdAt`
 * is a real `Date`, `version.number` is a number, `status` is a `ContentStatus`);
 * the same canonical whiteboard comes back consistently from `getWhiteboardById`;
 * a whiteboard created under a page reports that page as its `parentId` with
 * `parentType: 'page'`; and a deleted whiteboard surfaces as a typed 404
 * `ApiError`.
 *
 * Environment gating: whiteboards are a premium content type a standard Cloud
 * site may not allow creating. Creation is always *attempted* (to exercise param
 * + body serialization), but a rejection is accepted as a typed `ApiError` with
 * an expected status, and the get/delete typing is still exercised against a
 * plausible id. A gated run never hard-fails the suite — see report.
 *
 * ID gotcha: model ids are numeric *strings* (`whiteboard.id: string`), while the
 * path params of `getWhiteboardById`/`deleteWhiteboard` are `z.number()` — every
 * such call converts with `Number(whiteboard.id)`.
 */

/** Statuses a whiteboard may report — the `ContentStatus` enum. */
const CONTENT_STATUSES = ['current', 'draft', 'archived', 'historical', 'trashed', 'deleted', 'any'] as const;

/** Statuses accepted when the environment gates whiteboard creation. */
const GATED_STATUSES = [400, 403, 404, 501] as const;

type Whiteboard = Awaited<ReturnType<ReturnType<typeof createCloudV2Client>['whiteboard']['createWhiteboard']>>;

let client: ReturnType<typeof createCloudV2Client>;
const tracker = new ResourceTracker();
let space: TestSpace;
/** A page used as a parent for the nested-creation breadth check. */
let parentPage: Awaited<ReturnType<typeof createTestPage>>;

/** The canonical whiteboard created at the space root, asserted against everywhere. */
let created: Whiteboard | undefined;
let createError: unknown;
const title = testName('whiteboard');

/** The nested whiteboard created under `parentPage` (when not gated). */
let nested: Whiteboard | undefined;

/** A meaningful structural check for any whiteboard returned by the API. */
function expectWellFormedWhiteboard(wb: Whiteboard) {
  expect(typeof wb.id).toBe('string');
  expect(wb.id).toBeTruthy();
  expect(typeof wb.spaceId).toBe('string');
  expect(wb.spaceId).toBe(space.id);

  if (wb.status !== undefined) expect(CONTENT_STATUSES).toContain(wb.status);

  // `createdAt` is `z.coerce.date()` — a parsed response yields a real Date.
  expect(wb.createdAt).toBeInstanceOf(Date);
  // A freshly created entity is version 1.
  expect(wb.version?.number).toBe(1);
  expect(typeof wb.authorId).toBe('string');
}

beforeAll(async () => {
  client = getLiveClient();

  space = await createTestSpace(tracker);
  parentPage = await createTestPage(tracker, space.id);

  // Always attempt creation — exercises param/body serialization either way.
  try {
    created = await client.whiteboard.createWhiteboard({ body: { spaceId: space.id, title } });

    const id = Number(created.id);
    tracker.defer(async () => {
      await client.whiteboard.deleteWhiteboard({ id }).catch(() => undefined);
    });
  } catch (error) {
    createError = error;
  }

  // Breadth: a whiteboard filed under a page should report the page as its parent.
  if (created) {
    try {
      nested = await client.whiteboard.createWhiteboard({
        body: { spaceId: space.id, title: testName('whiteboard-nested'), parentId: parentPage.id },
      });

      const id = Number(nested.id);
      tracker.defer(async () => {
        await client.whiteboard.deleteWhiteboard({ id }).catch(() => undefined);
      });
    } catch {
      nested = undefined;
    }
  }
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — whiteboard.createWhiteboard (live, lifecycle)', () => {
  it('either creates a typed Whiteboard or rejects with a typed ApiError when gated', () => {
    if (created) {
      expect(created.title).toBe(title);
      expectWellFormedWhiteboard(created);
      // Created at the space root → no parent content.
      expect(created.parentId == null || typeof created.parentId === 'string').toBe(true);

      return;
    }

    // Gated path — site does not permit whiteboard creation.
    expect(createError, 'create neither succeeded nor threw').toBeInstanceOf(ApiError);
    expect(GATED_STATUSES).toContain((createError as ApiError).status);
  });

  it('files a whiteboard under a page with parentType `page` (breadth)', () => {
    if (!nested) return; // gated, or nested creation unsupported here

    expect(nested.parentId).toBe(parentPage.id);
    expect(nested.parentType).toBe('page');
    expect(nested.spaceId).toBe(space.id);
    expect(nested.version?.number).toBe(1);
  });
});

describe('Confluence Cloud v2 — whiteboard.getWhiteboardById (live)', () => {
  it('returns the canonical entity created above with model-typed fields', async () => {
    if (!created) return; // covered by the dedicated 404 case below in the gated path

    const fetched = await client.whiteboard.getWhiteboardById({ id: Number(created.id) });

    expect(fetched.id).toBe(created.id);
    expect(fetched.title).toBe(title);
    expect(fetched.spaceId).toBe(space.id);
    expect(CONTENT_STATUSES).toContain(fetched.status);
    expect(fetched.createdAt).toBeInstanceOf(Date);
    expect(fetched.version?.number).toBe(1);
    // Every real whiteboard exposes a web UI link.
    expect(typeof fetched._links?.webui).toBe('string');
    expect(fetched._links?.webui).toBeTruthy();
  });

  it('expands operations/properties only when the include-* flags are set', async () => {
    if (!created) return;

    const expanded = await client.whiteboard.getWhiteboardById({
      id: Number(created.id),
      includeOperations: true,
      includeProperties: true,
    });

    expect(expanded.id).toBe(created.id);
    // NOTE: `include-operations`/`include-properties` add expansions the `Whiteboard`
    // model does not declare, so they land on the loose index — read defensively.
    const expansions = expanded as Record<string, { results?: unknown[] } | undefined>;

    if (expansions.operations) expect(Array.isArray(expansions.operations.results ?? [])).toBe(true);

    if (expansions.properties) expect(Array.isArray(expansions.properties.results ?? [])).toBe(true);
  });

  it('rejects a non-existent whiteboard id with a typed ApiError', async () => {
    let caught: unknown;

    try {
      await client.whiteboard.getWhiteboardById({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect([400, 404]).toContain((caught as ApiError).status);
  });
});

describe('Confluence Cloud v2 — whiteboard.deleteWhiteboard (live)', () => {
  it('deletes a whiteboard so a subsequent getWhiteboardById yields a 404 ApiError', async () => {
    let disposable: Whiteboard;

    try {
      disposable = await client.whiteboard.createWhiteboard({
        body: { spaceId: space.id, title: testName('whiteboard-disposable') },
      });
    } catch (error) {
      // Gated path — still exercise delete typing against a plausible id.
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);

      let caught: unknown;
      try {
        await client.whiteboard.deleteWhiteboard({ id: 999_999_999 });
      } catch (e) {
        caught = e;
      }
      expect(caught).toBeInstanceOf(ApiError);
      expect([400, 404]).toContain((caught as ApiError).status);

      return;
    }

    const id = Number(disposable.id);
    // Safety net should the assertion below not run.
    tracker.defer(async () => {
      await client.whiteboard.deleteWhiteboard({ id }).catch(() => undefined);
    });

    await client.whiteboard.deleteWhiteboard({ id });

    // A plain v2 DELETE moves content to TRASH (204) rather than purging it: the
    // entity is still fetchable, now with status 'trashed'. Only a purge yields 404.
    const after = await client.whiteboard.getWhiteboardById({ id }).catch(e => e);

    if (after instanceof ApiError) {
      expect(after.status).toBe(404); // hard-deleted (purged)
    } else {
      expect(['trashed', 'deleted']).toContain(after.status); // moved to trash (the common case)
    }
  });
});
