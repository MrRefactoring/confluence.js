import { describe, it, expect, beforeAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';

/**
 * Groups live only in v1 — v2 has no equivalent, and user-membership writes have
 * moved out to the Atlassian Admin API entirely.
 *
 * Read paths only. Creating and deleting groups is site-wide and org-admin gated;
 * a test that leaves a stray group behind on a shared tenant is worse than one
 * that does not run.
 */

let client: V1Client;

beforeAll(() => {
  client = getV1Client();
});

function expectWellFormedGroup(group: Record<string, unknown>): void {
  expect(group).toMatchObject({ type: expect.any(String), name: expect.any(String) });

  if (group.id !== undefined) expect(typeof group.id).toBe('string');
}

describe('Confluence Cloud v1 — group.getGroups (live)', () => {
  it('returns a typed page of groups', async () => {
    const groups = await client.group.getGroups({});

    expect(Array.isArray(groups.results)).toBe(true);
    expect(groups.results.length).toBeGreaterThan(0);

    for (const group of groups.results) expectWellFormedGroup(group);
  });

  it('honors `limit`', async () => {
    const groups = await client.group.getGroups({ limit: 1 });

    expect(groups.results.length).toBeLessThanOrEqual(1);
  });

  it('honors `start` — the second page does not repeat the first', async () => {
    const all = await client.group.getGroups({ limit: 2 });

    if (all.results.length < 2) return;

    const second = await client.group.getGroups({ start: 1, limit: 1 });

    expect(second.results[0]?.id).toBe(all.results[1]?.id);
  });
});

describe('Confluence Cloud v1 — group.getGroupByGroupId (live)', () => {
  it('returns the same group the listing does, by id', async () => {
    const groups = await client.group.getGroups({ limit: 1 });
    const source = groups.results[0];

    expect(source?.id).toBeTruthy();

    const byId = await client.group.getGroupByGroupId({ id: source!.id! });

    expectWellFormedGroup(byId);
    expect(byId.id).toBe(source!.id);
    expect(byId.name).toBe(source!.name);
  });

  it('rejects an unknown group id with an ApiError', async () => {
    const error = await client.group
      .getGroupByGroupId({ id: '00000000-0000-0000-0000-000000000000' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect([400, 404]).toContain((error as ApiError).status);
  });
});

describe('Confluence Cloud v1 — group.getGroupMembersByGroupId (live)', () => {
  it('returns a typed page of members for a real group', async () => {
    const groups = await client.group.getGroups({ limit: 1 });
    const groupId = groups.results[0]?.id;

    expect(groupId).toBeTruthy();

    const members = await client.group.getGroupMembersByGroupId({ groupId: groupId!, limit: 5 });

    expect(Array.isArray(members.results)).toBe(true);
    expect(members.results.length).toBeLessThanOrEqual(5);

    for (const member of members.results) {
      expect(typeof member.type).toBe('string');
    }
  });

  // Unlike getGroupByGroupId, this one answers 200 with an empty page for a group
  // that does not exist — "no members" and "no such group" are indistinguishable.
  // Worth pinning: it means a caller cannot use it to probe existence.
  it('answers an unknown group id with an empty page, not a 404', async () => {
    const members = await client.group.getGroupMembersByGroupId({
      groupId: '00000000-0000-0000-0000-000000000000',
    });

    expect(members.results).toEqual([]);
    expect(members.size).toBe(0);
  });
});

describe('Confluence Cloud v1 — group.searchGroups (live, gated-graceful)', () => {
  it('searches groups by name, or surfaces a typed ApiError when not permitted', async () => {
    try {
      const found = await client.group.searchGroups({ query: 'confluence', limit: 5 });

      expect(Array.isArray(found.results)).toBe(true);

      for (const group of found.results) expectWellFormedGroup(group);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });
});
