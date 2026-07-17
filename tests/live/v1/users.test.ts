import { describe, it, expect, beforeAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';

/**
 * Reference live suite for the Confluence Cloud v1 `users` API — the template the
 * other v1 suites follow.
 *
 * v1 is not the old API frozen in place: Atlassian has pruned its spec down to
 * what v2 does not cover, and nothing here had ever been exercised against a real
 * tenant. These suites exist for the same reason the v2 ones do — strict Zod
 * validation against live data is the only thing that catches the spec
 * under-declaring nullability or mis-typing a field.
 */

let client: V1Client;

beforeAll(() => {
  client = getV1Client();
});

/** Every v1 user response shares this core shape. */
function expectWellFormedUser(user: Record<string, unknown>): void {
  expect(user).toMatchObject({ type: expect.any(String) });

  if (user.accountId !== undefined) expect(typeof user.accountId).toBe('string');
  if (user.displayName !== undefined) expect(typeof user.displayName).toBe('string');
  if (user.accountType !== undefined) expect(typeof user.accountType).toBe('string');
}

describe('Confluence Cloud v1 — users.getCurrentUser (live)', () => {
  it('returns the authenticated user, fully typed', async () => {
    const user = await client.users.getCurrentUser({});

    expectWellFormedUser(user);
    expect(user.accountId).toBeTruthy();
  });

  it('honors `expand` — asking for operations does not change the identity', async () => {
    const plain = await client.users.getCurrentUser({});
    const expanded = await client.users.getCurrentUser({ expand: ['operations'] });

    expect(expanded.accountId).toBe(plain.accountId);
  });
});

describe('Confluence Cloud v1 — users.getUser (live)', () => {
  it('returns the same user the current-user endpoint does, by accountId', async () => {
    const me = await client.users.getCurrentUser({});
    const byId = await client.users.getUser({ accountId: me.accountId! });

    expectWellFormedUser(byId);
    expect(byId.accountId).toBe(me.accountId);
    expect(byId.displayName).toBe(me.displayName);
  });

  it('rejects an unknown accountId with an ApiError', async () => {
    const error = await client.users
      .getUser({ accountId: 'cfjs:00000000-0000-0000-0000-000000000000' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect([400, 404]).toContain((error as ApiError).status);
  });
});

describe('Confluence Cloud v1 — users.getAnonymousUser (live)', () => {
  it('returns the anonymous user with no accountId', async () => {
    const anonymous = await client.users.getAnonymousUser({});

    expectWellFormedUser(anonymous);
    expect(anonymous.type).toBe('anonymous');
    expect(anonymous.accountId).toBeUndefined();
  });
});

describe('Confluence Cloud v1 — users.getGroupMembershipsForUser (live)', () => {
  it('returns a typed page of the current user groups', async () => {
    const me = await client.users.getCurrentUser({});
    const groups = await client.users.getGroupMembershipsForUser({ accountId: me.accountId! });

    expect(Array.isArray(groups.results)).toBe(true);
    expect(typeof groups.size).toBe('number');

    for (const group of groups.results) {
      expect(group).toMatchObject({ type: expect.any(String), name: expect.any(String) });
    }
  });

  it('honors `limit`', async () => {
    const me = await client.users.getCurrentUser({});
    const groups = await client.users.getGroupMembershipsForUser({ accountId: me.accountId!, limit: 1 });

    expect(groups.results.length).toBeLessThanOrEqual(1);
  });
});

describe('Confluence Cloud v1 — users.getBulkUserLookup (live, gated-graceful)', () => {
  it('looks the current user up in bulk, or surfaces a typed ApiError when unavailable', async () => {
    const me = await client.users.getCurrentUser({});

    try {
      const bulk = await client.users.getBulkUserLookup({ accountId: me.accountId! });

      expect(Array.isArray(bulk.results)).toBe(true);

      for (const user of bulk.results ?? []) expectWellFormedUser(user as Record<string, unknown>);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });
});
