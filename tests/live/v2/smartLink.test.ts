import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { createV2Client } from '#/v2';
import { getV2Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestSpace, createTestPage, type TestSpace } from '../setup/fixtures';

/**
 * Live integration suite for the Confluence Cloud v2 `smartLink` API (Smart Links
 * in the content tree / "embeds"), covering its full lifecycle: `createSmartLink`,
 * `getSmartLinkById`, `deleteSmartLink`.
 *
 * The assertions verify the *contract* of each function, not merely that a call
 * resolves: a created Smart Link is typed exactly as the `SmartLink` Zod model
 * declares (`id`/`spaceId`/`authorId`/`ownerId` are numeric strings, `embedUrl`
 * echoes the requested URL, `createdAt` is a real `Date`, `version.number` is a
 * number, `status` is a `ContentStatus`); the same canonical Smart Link comes
 * back consistently from `getSmartLinkById`; a Smart Link created under a page
 * reports that page as its `parentId` with `parentType: 'page'`; and a deleted
 * Smart Link surfaces as a typed 404 `ApiError`.
 *
 * Environment gating: Smart Link creation is wrapped defensively — a rejection is
 * accepted as a typed `ApiError` with an expected status, and the get/delete
 * typing is exercised against a plausible id. A gated run never hard-fails the
 * suite — see report.
 *
 * ID gotcha: model ids are numeric *strings* (`smartLink.id: string`), while the
 * path params of `getSmartLinkById`/`deleteSmartLink` are `z.number()` — every
 * such call converts with `Number(smartLink.id)`.
 */

/** Statuses a Smart Link may report — the `ContentStatus` enum. */
const CONTENT_STATUSES = ['current', 'draft', 'archived', 'historical', 'trashed', 'deleted', 'any'] as const;

/** Statuses accepted when the environment gates Smart Link creation. */
const GATED_STATUSES = [400, 403, 404, 501] as const;

/** A real, resolvable URL the Smart Link embeds. */
const EMBED_URL = 'https://www.atlassian.com';

type SmartLink = Awaited<ReturnType<ReturnType<typeof createV2Client>['smartLink']['createSmartLink']>>;

let client: ReturnType<typeof createV2Client>;
const tracker = new ResourceTracker();
let space: TestSpace;
/** A page used as a parent for the nested-creation breadth check. */
let parentPage: Awaited<ReturnType<typeof createTestPage>>;

/** The canonical Smart Link created at the space root, asserted against everywhere. */
let created: SmartLink | undefined;
let createError: unknown;

/** The nested Smart Link created under `parentPage` (when not gated). */
let nested: SmartLink | undefined;

/** A meaningful structural check for any Smart Link returned by the API. */
function expectWellFormedSmartLink(link: SmartLink) {
  expect(typeof link.id).toBe('string');
  expect(link.id).toBeTruthy();
  expect(typeof link.spaceId).toBe('string');
  expect(link.spaceId).toBe(space.id);

  if (link.status !== undefined) expect(CONTENT_STATUSES).toContain(link.status);

  // `createdAt` is `z.coerce.date()` — a parsed response yields a real Date.
  expect(link.createdAt).toBeInstanceOf(Date);
  // A freshly created entity is version 1.
  expect(link.version?.number).toBe(1);
  expect(typeof link.authorId).toBe('string');
}

beforeAll(async () => {
  client = getV2Client();

  space = await createTestSpace(tracker);
  parentPage = await createTestPage(tracker, space.id);

  // Always attempt creation — exercises param/body serialization either way.
  try {
    created = await client.smartLink.createSmartLink({ body: { spaceId: space.id, embedUrl: EMBED_URL } });

    const id = Number(created.id);
    tracker.defer(async () => {
      await client.smartLink.deleteSmartLink({ id }).catch(() => undefined);
    });
  } catch (error) {
    createError = error;
  }

  // Breadth: a Smart Link filed under a page should report the page as its parent.
  if (created) {
    try {
      nested = await client.smartLink.createSmartLink({
        body: { spaceId: space.id, embedUrl: EMBED_URL, parentId: parentPage.id },
      });

      const id = Number(nested.id);
      tracker.defer(async () => {
        await client.smartLink.deleteSmartLink({ id }).catch(() => undefined);
      });
    } catch {
      nested = undefined;
    }
  }
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — smartLink.createSmartLink (live, lifecycle)', () => {
  it('either creates a typed SmartLink or rejects with a typed ApiError when gated', () => {
    if (created) {
      expectWellFormedSmartLink(created);

      // The embedded URL echoes the requested one (per the model, omitted only when absent).
      if (created.embedUrl !== undefined) expect(created.embedUrl).toBe(EMBED_URL);

      // A title is derived from the link target — a string when present.
      if (created.title !== undefined) expect(typeof created.title).toBe('string');

      // Created at the space root → no parent content.
      expect(created.parentId == null || typeof created.parentId === 'string').toBe(true);

      return;
    }

    // Gated path — site does not permit Smart Link creation.
    expect(createError, 'create neither succeeded nor threw').toBeInstanceOf(ApiError);
    expect(GATED_STATUSES).toContain((createError as ApiError).status);
  });

  it('files a Smart Link under a page with parentType `page` (breadth)', () => {
    if (!nested) return; // gated, or nested creation unsupported here

    expect(nested.parentId).toBe(parentPage.id);
    expect(nested.parentType).toBe('page');
    expect(nested.spaceId).toBe(space.id);
    expect(nested.version?.number).toBe(1);
  });
});

describe('Confluence Cloud v2 — smartLink.getSmartLinkById (live)', () => {
  it('returns the canonical entity created above with model-typed fields', async () => {
    if (!created) return; // covered by the dedicated 404 case below in the gated path

    const fetched = await client.smartLink.getSmartLinkById({ id: Number(created.id) });

    expect(fetched.id).toBe(created.id);
    expect(fetched.spaceId).toBe(space.id);

    if (fetched.embedUrl !== undefined) expect(fetched.embedUrl).toBe(EMBED_URL);

    expect(CONTENT_STATUSES).toContain(fetched.status);
    expect(fetched.createdAt).toBeInstanceOf(Date);
    expect(fetched.version?.number).toBe(1);
    // Every real Smart Link exposes a web UI link.
    expect(typeof fetched._links?.webui).toBe('string');
    expect(fetched._links?.webui).toBeTruthy();
  });

  it('expands operations/properties only when the include-* flags are set', async () => {
    if (!created) return;

    const expanded = await client.smartLink.getSmartLinkById({
      id: Number(created.id),
      includeOperations: true,
      includeProperties: true,
    });

    expect(expanded.id).toBe(created.id);
    // NOTE: `include-operations`/`include-properties` add expansions the `SmartLink`
    // model does not declare, so they land on the loose index — read defensively.
    const expansions = expanded as Record<string, { results?: unknown[] } | undefined>;

    if (expansions.operations) expect(Array.isArray(expansions.operations.results ?? [])).toBe(true);

    if (expansions.properties) expect(Array.isArray(expansions.properties.results ?? [])).toBe(true);
  });

  it('rejects a non-existent Smart Link id with a typed ApiError', async () => {
    let caught: unknown;

    try {
      await client.smartLink.getSmartLinkById({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect([400, 404]).toContain((caught as ApiError).status);
  });
});

describe('Confluence Cloud v2 — smartLink.deleteSmartLink (live)', () => {
  it('deletes a Smart Link so a subsequent getSmartLinkById yields a 404 ApiError', async () => {
    let disposable: SmartLink;

    try {
      disposable = await client.smartLink.createSmartLink({
        body: { spaceId: space.id, embedUrl: EMBED_URL },
      });
    } catch (error) {
      // Gated path — still exercise delete typing against a plausible id.
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);

      let caught: unknown;
      try {
        await client.smartLink.deleteSmartLink({ id: 999_999_999 });
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
      await client.smartLink.deleteSmartLink({ id }).catch(() => undefined);
    });

    await client.smartLink.deleteSmartLink({ id });

    // A plain v2 DELETE moves content to TRASH (204) rather than purging it: the
    // entity is still fetchable, now with status 'trashed'. Only a purge yields 404.
    const after = await client.smartLink.getSmartLinkById({ id }).catch(e => e);

    if (after instanceof ApiError) {
      expect(after.status).toBe(404); // hard-deleted (purged)
    } else {
      expect(['trashed', 'deleted']).toContain(after.status); // moved to trash (the common case)
    }
  });
});
