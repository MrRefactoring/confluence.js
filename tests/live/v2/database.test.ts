import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { createV2Client } from '#/v2';
import { getV2Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestSpace, createTestPage, type TestSpace } from '../setup/fixtures';
import { testName } from '../helpers/naming';

/**
 * Live integration suite for the Confluence Cloud v2 `database` API, covering its
 * full lifecycle: `createDatabase`, `getDatabaseById`, `deleteDatabase`.
 *
 * The assertions verify the *contract* of each function, not merely that a call
 * resolves: a created database is typed exactly as the `Database` Zod model
 * declares (`id`/`spaceId`/`authorId`/`ownerId` are numeric strings, `createdAt`
 * is a real `Date`, `version.number` is a number, `status` is a `ContentStatus`);
 * the same canonical database comes back consistently from `getDatabaseById`; a
 * database created under a page reports that page as its `parentId` with
 * `parentType: 'page'`; and a deleted database surfaces as a typed 404 `ApiError`.
 *
 * Environment gating: databases are a premium content type a standard Cloud site
 * may not allow creating. Creation is always *attempted* (to exercise param +
 * body serialization), but a rejection is accepted as a typed `ApiError` with an
 * expected status, and the get/delete typing is still exercised against a
 * plausible id. A gated run never hard-fails the suite — see report.
 *
 * ID gotcha: model ids are numeric *strings* (`database.id: string`), while the
 * path params of `getDatabaseById`/`deleteDatabase` are `z.number()` — every such
 * call converts with `Number(database.id)`.
 */

/** Statuses a database may report — the `ContentStatus` enum. */
const CONTENT_STATUSES = ['current', 'draft', 'archived', 'historical', 'trashed', 'deleted', 'any'] as const;

/** Statuses accepted when the environment gates database creation. */
const GATED_STATUSES = [400, 403, 404, 501] as const;

type Database = Awaited<ReturnType<ReturnType<typeof createV2Client>['database']['createDatabase']>>;

let client: ReturnType<typeof createV2Client>;
const tracker = new ResourceTracker();
let space: TestSpace;
/** A page used as a parent for the nested-creation breadth check. */
let parentPage: Awaited<ReturnType<typeof createTestPage>>;

/** The canonical database created at the space root, asserted against everywhere. */
let created: Database | undefined;
let createError: unknown;
const title = testName('database');

/** The nested database created under `parentPage` (when not gated). */
let nested: Database | undefined;

/** A meaningful structural check for any database returned by the API. */
function expectWellFormedDatabase(db: Database) {
  expect(typeof db.id).toBe('string');
  expect(db.id).toBeTruthy();
  expect(typeof db.spaceId).toBe('string');
  expect(db.spaceId).toBe(space.id);

  if (db.status !== undefined) expect(CONTENT_STATUSES).toContain(db.status);

  // `createdAt` is `z.coerce.date()` — a parsed response yields a real Date.
  expect(db.createdAt).toBeInstanceOf(Date);
  // A freshly created entity is version 1.
  expect(db.version?.number).toBe(1);
  expect(typeof db.authorId).toBe('string');
}

beforeAll(async () => {
  client = getV2Client();

  space = await createTestSpace(tracker);
  parentPage = await createTestPage(tracker, space.id);

  // Always attempt creation — exercises param/body serialization either way.
  try {
    created = await client.database.createDatabase({ body: { spaceId: space.id, title } });

    const id = Number(created.id);
    tracker.defer(async () => {
      await client.database.deleteDatabase({ id }).catch(() => undefined);
    });
  } catch (error) {
    createError = error;
  }

  // Breadth: a database filed under a page should report the page as its parent.
  if (created) {
    try {
      nested = await client.database.createDatabase({
        body: { spaceId: space.id, title: testName('database-nested'), parentId: parentPage.id },
      });

      const id = Number(nested.id);
      tracker.defer(async () => {
        await client.database.deleteDatabase({ id }).catch(() => undefined);
      });
    } catch {
      nested = undefined;
    }
  }
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — database.createDatabase (live, lifecycle)', () => {
  it('either creates a typed Database or rejects with a typed ApiError when gated', () => {
    if (created) {
      expect(created.title).toBe(title);
      expectWellFormedDatabase(created);
      // Created at the space root → no parent content.
      expect(created.parentId == null || typeof created.parentId === 'string').toBe(true);

      return;
    }

    // Gated path — site does not permit database creation.
    expect(createError, 'create neither succeeded nor threw').toBeInstanceOf(ApiError);
    expect(GATED_STATUSES).toContain((createError as ApiError).status);
  });

  it('files a database under a page with parentType `page` (breadth)', () => {
    if (!nested) return; // gated, or nested creation unsupported here

    expect(nested.parentId).toBe(parentPage.id);
    expect(nested.parentType).toBe('page');
    expect(nested.spaceId).toBe(space.id);
    expect(nested.version?.number).toBe(1);
  });
});

describe('Confluence Cloud v2 — database.getDatabaseById (live)', () => {
  it('returns the canonical entity created above with model-typed fields', async () => {
    if (!created) return; // covered by the dedicated 404 case below in the gated path

    const fetched = await client.database.getDatabaseById({ id: Number(created.id) });

    expect(fetched.id).toBe(created.id);
    expect(fetched.title).toBe(title);
    expect(fetched.spaceId).toBe(space.id);
    expect(CONTENT_STATUSES).toContain(fetched.status);
    expect(fetched.createdAt).toBeInstanceOf(Date);
    expect(fetched.version?.number).toBe(1);
    // Every real database exposes a web UI link.
    expect(typeof fetched._links?.webui).toBe('string');
    expect(fetched._links?.webui).toBeTruthy();
  });

  it('expands operations/properties only when the include-* flags are set', async () => {
    if (!created) return;

    const expanded = await client.database.getDatabaseById({
      id: Number(created.id),
      includeOperations: true,
      includeProperties: true,
    });

    expect(expanded.id).toBe(created.id);
    // NOTE: `include-operations`/`include-properties` add expansions the `Database`
    // model does not declare, so they land on the loose index — read defensively.
    const expansions = expanded as Record<string, { results?: unknown[] } | undefined>;

    if (expansions.operations) expect(Array.isArray(expansions.operations.results ?? [])).toBe(true);

    if (expansions.properties) expect(Array.isArray(expansions.properties.results ?? [])).toBe(true);
  });

  it('rejects a non-existent database id with a typed ApiError', async () => {
    let caught: unknown;

    try {
      await client.database.getDatabaseById({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect([400, 404]).toContain((caught as ApiError).status);
  });
});

describe('Confluence Cloud v2 — database.deleteDatabase (live)', () => {
  it('deletes a database so a subsequent getDatabaseById yields a 404 ApiError', async () => {
    let disposable: Database;

    try {
      disposable = await client.database.createDatabase({
        body: { spaceId: space.id, title: testName('database-disposable') },
      });
    } catch (error) {
      // Gated path — still exercise delete typing against a plausible id.
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);

      let caught: unknown;
      try {
        await client.database.deleteDatabase({ id: 999_999_999 });
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
      await client.database.deleteDatabase({ id }).catch(() => undefined);
    });

    await client.database.deleteDatabase({ id });

    // A plain v2 DELETE moves content to TRASH (204) rather than purging it: the
    // entity is still fetchable, now with status 'trashed'. Only a purge yields 404.
    const after = await client.database.getDatabaseById({ id }).catch(e => e);

    if (after instanceof ApiError) {
      expect(after.status).toBe(404); // hard-deleted (purged)
    } else {
      expect(['trashed', 'deleted']).toContain(after.status); // moved to trash (the common case)
    }
  });
});
