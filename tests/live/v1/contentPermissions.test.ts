import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestPage, createTestSpace } from '../setup/fixtures';

/**
 * `checkContentPermission` answers "may this subject do X to this content" — v1
 * only, with no v2 equivalent.
 *
 * It answers in the body, not by status: a denial is a `200` with
 * `hasPermission: false`. Worth pinning, since a caller who checks only the
 * status code reads every denial as a grant.
 */

const tracker = new ResourceTracker();

let client: V1Client;
let pageId: string;
let accountId: string;

beforeAll(async () => {
  client = getV1Client();

  const space = await createTestSpace(tracker, 'perm');
  const page = await createTestPage(tracker, space.id);

  pageId = String(page.id);
  accountId = (await client.users.getCurrentUser({})).accountId!;
}, 100_000);

afterAll(async () => {
  await tracker.cleanup();
}, 100_000);

describe('Confluence Cloud v1 — contentPermissions.checkContentPermission (live)', () => {
  it('grants the creator read on their own page', async () => {
    const result = await client.contentPermissions.checkContentPermission({
      id: pageId,
      subject: { type: 'user', identifier: accountId },
      operation: 'read',
    });

    expect(result.hasPermission).toBe(true);
  });

  it('grants the creator update and delete on their own page', async () => {
    for (const operation of ['update', 'delete'] as const) {
      const result = await client.contentPermissions.checkContentPermission({
        id: pageId,
        subject: { type: 'user', identifier: accountId },
        operation,
      });

      expect(result.hasPermission).toBe(true);
    }
  });

  // A denial is data, not an error: the call succeeds and reports `false`. Pinned
  // because it is invisible from the types — `hasPermission` is just a boolean.
  it('reports a denial as a 200 with hasPermission false, not as an error', async () => {
    const result = await client.contentPermissions.checkContentPermission({
      id: pageId,
      subject: { type: 'user', identifier: 'anonymous' },
      operation: 'update',
    });

    expect(result.hasPermission).toBe(false);
    expect(Array.isArray(result.errors)).toBe(true);
  });

  it('rejects an unknown content id with an ApiError', async () => {
    const error = await client.contentPermissions
      .checkContentPermission({
        id: '0',
        subject: { type: 'user', identifier: accountId },
        operation: 'read',
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });

  it('rejects an unknown subject with an ApiError', async () => {
    const error = await client.contentPermissions
      .checkContentPermission({
        id: pageId,
        subject: { type: 'user', identifier: 'cfjs:00000000-0000-0000-0000-000000000000' },
        operation: 'read',
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});
