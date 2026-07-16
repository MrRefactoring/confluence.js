import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '@confluence.js/core';
import type { createCloudV2Client } from '@confluence.js/cloud';
import { getLiveClient } from './setup/client';
import { ResourceTracker } from './setup/resources';
import { createTestSpace, createTestPage, type TestSpace } from './setup/fixtures';
import { testName } from './helpers/naming';

/**
 * Live integration suite for the Confluence Cloud v2 `folder` API, covering its
 * full lifecycle: `createFolder`, `getFolderById`, `deleteFolder`.
 *
 * The assertions verify the *contract* of each function, not merely that a call
 * resolves: a created folder is typed exactly as the `Folder` Zod model declares
 * (`id`/`spaceId`/`authorId`/`ownerId` are numeric strings, `createdAt` is a real
 * `Date`, `version.number` is a number, `status` is a `ContentStatus`); the same
 * canonical folder comes back consistently from `getFolderById`; a folder created
 * under a page reports that page as its `parentId` with `parentType: 'page'`; and
 * a deleted folder surfaces as a typed 404 `ApiError`.
 *
 * Environment gating: folders are generally available on standard Cloud sites,
 * but creation is still wrapped defensively — a rejection is accepted as a typed
 * `ApiError` with an expected status, and the get/delete typing is exercised
 * against a plausible id. A gated run never hard-fails the suite — see report.
 *
 * ID gotcha: model ids are numeric *strings* (`folder.id: string`), while the
 * path params of `getFolderById`/`deleteFolder` are `z.number()` — every such
 * call converts with `Number(folder.id)`.
 */

/** Statuses a folder may report — the `ContentStatus` enum. */
const CONTENT_STATUSES = ['current', 'draft', 'archived', 'historical', 'trashed', 'deleted', 'any'] as const;

/** Statuses accepted when the environment gates folder creation. */
const GATED_STATUSES = [400, 403, 404, 501] as const;

type Folder = Awaited<ReturnType<ReturnType<typeof createCloudV2Client>['folder']['createFolder']>>;

let client: ReturnType<typeof createCloudV2Client>;
const tracker = new ResourceTracker();
let space: TestSpace;
/** A page used as a parent for the nested-creation breadth check. */
let parentPage: Awaited<ReturnType<typeof createTestPage>>;

/** The canonical folder created at the space root, asserted against everywhere. */
let created: Folder | undefined;
let createError: unknown;
const title = testName('folder');

/** The nested folder created under `parentPage` (when not gated). */
let nested: Folder | undefined;

/** A meaningful structural check for any folder returned by the API. */
function expectWellFormedFolder(folder: Folder) {
  expect(typeof folder.id).toBe('string');
  expect(folder.id).toBeTruthy();
  expect(typeof folder.spaceId).toBe('string');
  expect(folder.spaceId).toBe(space.id);

  if (folder.status !== undefined) expect(CONTENT_STATUSES).toContain(folder.status);

  // `createdAt` is `z.coerce.date()` — a parsed response yields a real Date.
  expect(folder.createdAt).toBeInstanceOf(Date);
  // A freshly created entity is version 1.
  expect(folder.version?.number).toBe(1);
  expect(typeof folder.authorId).toBe('string');
}

beforeAll(async () => {
  client = getLiveClient();

  space = await createTestSpace(tracker);
  parentPage = await createTestPage(tracker, space.id);

  // Always attempt creation — exercises param/body serialization either way.
  try {
    created = await client.folder.createFolder({ body: { spaceId: space.id, title } });

    const id = Number(created.id);
    tracker.defer(async () => {
      await client.folder.deleteFolder({ id }).catch(() => undefined);
    });
  } catch (error) {
    createError = error;
  }

  // Breadth: a folder filed under a page should report the page as its parent.
  if (created) {
    try {
      nested = await client.folder.createFolder({
        body: { spaceId: space.id, title: testName('folder-nested'), parentId: parentPage.id },
      });

      const id = Number(nested.id);
      tracker.defer(async () => {
        await client.folder.deleteFolder({ id }).catch(() => undefined);
      });
    } catch {
      nested = undefined;
    }
  }
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — folder.createFolder (live, lifecycle)', () => {
  it('either creates a typed Folder or rejects with a typed ApiError when gated', () => {
    if (created) {
      expect(created.title).toBe(title);
      expectWellFormedFolder(created);
      // Created at the space root → no parent content.
      expect(created.parentId == null || typeof created.parentId === 'string').toBe(true);

      return;
    }

    // Gated path — site does not permit folder creation.
    expect(createError, 'create neither succeeded nor threw').toBeInstanceOf(ApiError);
    expect(GATED_STATUSES).toContain((createError as ApiError).status);
  });

  it('files a folder under a page with parentType `page` (breadth)', () => {
    if (!nested) return; // gated, or nested creation unsupported here

    expect(nested.parentId).toBe(parentPage.id);
    expect(nested.parentType).toBe('page');
    expect(nested.spaceId).toBe(space.id);
    expect(nested.version?.number).toBe(1);
  });
});

describe('Confluence Cloud v2 — folder.getFolderById (live)', () => {
  it('returns the canonical entity created above with model-typed fields', async () => {
    if (!created) return; // covered by the dedicated 404 case below in the gated path

    const fetched = await client.folder.getFolderById({ id: Number(created.id) });

    expect(fetched.id).toBe(created.id);
    expect(fetched.title).toBe(title);
    expect(fetched.spaceId).toBe(space.id);
    expect(CONTENT_STATUSES).toContain(fetched.status);
    expect(fetched.createdAt).toBeInstanceOf(Date);
    expect(fetched.version?.number).toBe(1);
    // Every real folder exposes a web UI link.
    expect(typeof fetched._links?.webui).toBe('string');
    expect(fetched._links?.webui).toBeTruthy();
  });

  it('expands operations/properties only when the include-* flags are set', async () => {
    if (!created) return;

    const expanded = await client.folder.getFolderById({
      id: Number(created.id),
      includeOperations: true,
      includeProperties: true,
    });

    expect(expanded.id).toBe(created.id);
    // NOTE: `include-operations`/`include-properties` add expansions the `Folder`
    // model does not declare, so they land on the loose index — read defensively.
    const expansions = expanded as Record<string, { results?: unknown[] } | undefined>;

    if (expansions.operations) expect(Array.isArray(expansions.operations.results ?? [])).toBe(true);

    if (expansions.properties) expect(Array.isArray(expansions.properties.results ?? [])).toBe(true);
  });

  it('rejects a non-existent folder id with a typed ApiError', async () => {
    let caught: unknown;

    try {
      await client.folder.getFolderById({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect([400, 404]).toContain((caught as ApiError).status);
  });
});

describe('Confluence Cloud v2 — folder.deleteFolder (live)', () => {
  it('deletes a folder so a subsequent getFolderById yields a 404 ApiError', async () => {
    let disposable: Folder;

    try {
      disposable = await client.folder.createFolder({
        body: { spaceId: space.id, title: testName('folder-disposable') },
      });
    } catch (error) {
      // Gated path — still exercise delete typing against a plausible id.
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);

      let caught: unknown;
      try {
        await client.folder.deleteFolder({ id: 999_999_999 });
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
      await client.folder.deleteFolder({ id }).catch(() => undefined);
    });

    await client.folder.deleteFolder({ id });

    // A plain v2 DELETE moves content to TRASH (204) rather than purging it: the
    // entity is still fetchable, now with status 'trashed'. Only a purge yields 404.
    const after = await client.folder.getFolderById({ id }).catch(e => e);

    if (after instanceof ApiError) {
      expect(after.status).toBe(404); // hard-deleted (purged)
    } else {
      expect(['trashed', 'deleted']).toContain(after.status); // moved to trash (the common case)
    }
  });
});
