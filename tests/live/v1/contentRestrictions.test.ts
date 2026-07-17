import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestPage, createTestSpace } from '../setup/fixtures';

/**
 * Content restrictions are v1-only and have no v2 equivalent — one of the reasons
 * v1 ships at all.
 *
 * All writes target a disposable fixture page, and restrictions are granted to the
 * calling user, so a run can never lock anyone out of anything real.
 */

const tracker = new ResourceTracker();

let client: V1Client;
let pageId: string;
let accountId: string;

beforeAll(async () => {
  client = getV1Client();

  const space = await createTestSpace(tracker, 'restrict');
  const page = await createTestPage(tracker, space.id);

  pageId = String(page.id);
  accountId = (await client.users.getCurrentUser({})).accountId!;
}, 100_000);

afterAll(async () => {
  await tracker.cleanup();
}, 100_000);

describe('Confluence Cloud v1 — contentRestrictions.getRestrictions (live)', () => {
  it('returns a typed restriction array for an unrestricted page', async () => {
    const restrictions = await client.contentRestrictions.getRestrictions({ id: pageId });

    expect(Array.isArray(restrictions.results)).toBe(true);
    expect(typeof restrictions.size).toBe('number');

    for (const restriction of restrictions.results) {
      expect(restriction).toMatchObject({ operation: expect.any(String) });
      expect(restriction.restrictions).toBeDefined();
    }
  });

  it('covers both operations — read and update — even with nothing restricted', async () => {
    const restrictions = await client.contentRestrictions.getRestrictions({ id: pageId });
    const operations = restrictions.results.map(restriction => restriction.operation);

    expect(operations).toContain('read');
    expect(operations).toContain('update');
  });

  it('honors `expand` for restriction principals', async () => {
    const restrictions = await client.contentRestrictions.getRestrictions({
      id: pageId,
      expand: ['restrictions.user', 'restrictions.group'],
    });

    expect(Array.isArray(restrictions.results)).toBe(true);
  });

  it('rejects an unknown content id with an ApiError', async () => {
    const error = await client.contentRestrictions.getRestrictions({ id: '0' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — contentRestrictions.getRestrictionsByOperation (live)', () => {
  it('returns restrictions keyed by operation, typed', async () => {
    const byOperation = await client.contentRestrictions.getRestrictionsByOperation({ id: pageId });

    expect(byOperation).toBeTypeOf('object');
  });

  it('returns the read restriction on its own, typed', async () => {
    const read = await client.contentRestrictions.getRestrictionsForOperation({ id: pageId, operationKey: 'read' });

    expect(read).toMatchObject({ operation: 'read' });
  });

  it('returns the update restriction on its own, typed', async () => {
    const update = await client.contentRestrictions.getRestrictionsForOperation({ id: pageId, operationKey: 'update' });

    expect(update).toMatchObject({ operation: 'update' });
  });
});

describe('Confluence Cloud v1 — restriction status probes (live)', () => {
  // The endpoint answers by status code, not by body: 404 means "this user is not
  // in the restriction list", 200 means they are. So a 404 here is the expected
  // answer for an open page rather than a failure, and callers have to treat it as
  // data. Worth pinning — it is invisible from the types.
  it('404s for a user who is not restricted, and 200s once they are', async () => {
    const openError = await client.contentRestrictions
      .getContentRestrictionStatusForUser({ id: pageId, operationKey: 'read', accountId })
      .catch((e: unknown) => e);

    expect(openError).toBeInstanceOf(ApiError);
    expect((openError as ApiError).status).toBe(404);

    await client.contentRestrictions.addRestrictions({
      id: pageId,
      body: [{ operation: 'read', restrictions: { user: [{ type: 'known', accountId }] } }],
    });

    await expect(
      client.contentRestrictions.getContentRestrictionStatusForUser({ id: pageId, operationKey: 'read', accountId }),
    ).resolves.not.toThrow();

    await client.contentRestrictions.deleteRestrictions({ id: pageId });
  });

  it('rejects an unknown accountId with an ApiError', async () => {
    const error = await client.contentRestrictions
      .getContentRestrictionStatusForUser({
        id: pageId,
        operationKey: 'read',
        accountId: 'cfjs:00000000-0000-0000-0000-000000000000',
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — restriction lifecycle (live, full round-trip)', () => {
  it('adds a read restriction for the current user and reads it back', async () => {
    const added = await client.contentRestrictions.addRestrictions({
      id: pageId,
      body: [{ operation: 'read', restrictions: { user: [{ type: 'known', accountId }] } }],
    });

    expect(Array.isArray(added.results)).toBe(true);

    const read = await client.contentRestrictions.getRestrictions({
      id: pageId,
      expand: ['restrictions.user'],
    });
    const readRestriction = read.results.find(restriction => restriction.operation === 'read');
    const users = readRestriction?.restrictions?.user?.results ?? [];

    expect(users.map(user => user.accountId)).toContain(accountId);
  });

  it('deletes every restriction, leaving the page open again', async () => {
    await client.contentRestrictions.deleteRestrictions({ id: pageId });

    const read = await client.contentRestrictions.getRestrictions({ id: pageId, expand: ['restrictions.user'] });
    const readRestriction = read.results.find(restriction => restriction.operation === 'read');

    expect(readRestriction?.restrictions?.user?.results ?? []).toHaveLength(0);
  });
});
