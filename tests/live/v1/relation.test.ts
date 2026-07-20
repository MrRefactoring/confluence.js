import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestPage, createTestSpace } from '../setup/fixtures';

/**
 * Relations are v1-only, with no v2 equivalent. The one relation Confluence
 * itself defines is `favourite` (user → content), so that is what this exercises:
 * the calling user favouriting a disposable fixture page.
 *
 * Note the British spelling — `favourite`. `favorite` is not a relation and the
 * API says so with a 404.
 */

const tracker = new ResourceTracker();

let client: V1Client;
let pageId: string;
let accountId: string;

beforeAll(async () => {
  client = getV1Client();

  const space = await createTestSpace(tracker, 'relation');
  const page = await createTestPage(tracker, space.id);

  pageId = String(page.id);
  accountId = (await client.users.getCurrentUser({})).accountId!;
}, 100_000);

afterAll(async () => {
  await tracker.cleanup();
}, 100_000);

/** The `favourite` relation from the current user to the fixture page. */
function favourite() {
  return {
    relationName: 'favourite',
    sourceType: 'user',
    sourceKey: accountId,
    targetType: 'content',
    targetKey: pageId,
  } as const;
}

describe('Confluence Cloud v1 — relation lifecycle (live, full round-trip)', () => {
  it('creates the relationship', async () => {
    const relationship = await client.relation.createRelationship(favourite());

    expect(relationship).toBeTypeOf('object');

    tracker.defer(async () => {
      await client.relation.deleteRelationship(favourite()).catch(() => undefined);
    });
  });

  // The relation is echoed back as `name`, not as the `relationName` you addressed
  // it by. The request and the response disagree on what the field is called.
  it('reads the relationship back, typed', async () => {
    const relationship = await client.relation.getRelationship(favourite());

    expect(relationship).toMatchObject({ name: 'favourite' });
    expect(relationship._links).toBeDefined();
  });

  // `expand` is honored asymmetrically: asking for both, only `source` comes back
  // expanded — `target` stays a link under `_expandable`. Pinned because the types
  // present the two as equals and the API does not.
  it('honors `expand` for source, but leaves target under `_expandable`', async () => {
    const plain = await client.relation.getRelationship(favourite());

    expect(plain.source).toBeUndefined();
    expect(plain._expandable?.source).toBeTruthy();

    const expanded = await client.relation.getRelationship({
      ...favourite(),
      expand: ['source', 'target'],
    });

    expect(expanded.source).toBeDefined();
    expect(expanded.target).toBeUndefined();
    expect(expanded._expandable?.target).toBeTruthy();
  });

  it('deletes the relationship, and reading it back 404s', async () => {
    await client.relation.deleteRelationship(favourite());

    const error = await client.relation.getRelationship(favourite()).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v1 — relation search (live)', () => {
  // `favourite` is the only relation Confluence ships, and it does not support
  // being searched: both find endpoints answer `501 NotImplementedServiceException:
  // find relations not implemented for Favourites`. So these two methods exist in
  // the spec with no relation on Cloud that can satisfy them. Pinned as the 501 it
  // is — if Atlassian ever implements it, this test fails and tells us.
  it('answers findTargetFromSource with a typed 501 — not implemented for favourites', async () => {
    const error = await client.relation
      .findTargetFromSource({
        relationName: 'favourite',
        sourceType: 'user',
        sourceKey: accountId,
        targetType: 'content',
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(501);
  });

  it('answers findSourcesForTarget with a typed 501 — not implemented for favourites', async () => {
    const error = await client.relation
      .findSourcesForTarget({
        relationName: 'favourite',
        sourceType: 'user',
        targetType: 'content',
        targetKey: pageId,
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(501);
  });
});

describe('Confluence Cloud v1 — relation rejections (live)', () => {
  it('rejects an unknown relation name with an ApiError', async () => {
    const error = await client.relation
      .getRelationship({ ...favourite(), relationName: 'cfjs-no-such-relation' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });

  it('rejects an unknown target with an ApiError', async () => {
    const error = await client.relation.getRelationship({ ...favourite(), targetKey: '0' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});
