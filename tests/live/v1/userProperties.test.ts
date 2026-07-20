import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { runId } from '../helpers/naming';

/**
 * User properties are arbitrary JSON hung off a user account. v1-only.
 *
 * Everything here is scoped to the *calling* user and to run-scoped keys, so a
 * run can only ever write to its own account under a key it invented.
 */

const tracker = new ResourceTracker();

let client: V1Client;
let userId: string;
let key: string;

beforeAll(async () => {
  client = getV1Client();
  userId = (await client.users.getCurrentUser({})).accountId!;
  key = `cfjs-prop-${runId()}`;
}, 60_000);

afterAll(async () => {
  await tracker.cleanup();
}, 60_000);

describe('Confluence Cloud v1 — userProperties.getUserProperties (live)', () => {
  it('returns a typed page of properties for the current user', async () => {
    const properties = await client.userProperties.getUserProperties({ userId });

    expect(Array.isArray(properties.results)).toBe(true);

    for (const property of properties.results ?? []) {
      expect(property).toMatchObject({ key: expect.any(String) });
    }
  });

  it('honors `limit`', async () => {
    const properties = await client.userProperties.getUserProperties({ userId, limit: 1 });

    expect(properties.results?.length ?? 0).toBeLessThanOrEqual(1);
  });

  it('rejects an unknown user with an ApiError', async () => {
    const error = await client.userProperties
      .getUserProperties({ userId: 'cfjs:00000000-0000-0000-0000-000000000000' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — user property lifecycle (live, full round-trip)', () => {
  it('creates a property and reads it back', async () => {
    await client.userProperties.createUserProperty({ userId, key, value: { hello: 'world', n: 1 } });

    tracker.defer(async () => {
      await client.userProperties.deleteUserProperty({ userId, key }).catch(() => undefined);
    });

    const property = await client.userProperties.getUserProperty({ userId, key });

    expect(property.key).toBe(key);
    expect(property.value).toMatchObject({ hello: 'world', n: 1 });
  });

  it('surfaces the property in the listing', async () => {
    const properties = await client.userProperties.getUserProperties({ userId, limit: 200 });
    const keys = properties.results?.map(property => property.key) ?? [];

    expect(keys).toContain(key);
  });

  it('updates the property, and the read-back matches what was written', async () => {
    await client.userProperties.updateUserProperty({ userId, key, value: { hello: 'updated' } });

    const property = await client.userProperties.getUserProperty({ userId, key });

    expect(property.value).toMatchObject({ hello: 'updated' });
  });

  it('deletes the property, and reading it back 404s', async () => {
    await client.userProperties.deleteUserProperty({ userId, key });

    const error = await client.userProperties.getUserProperty({ userId, key }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(404);
  });

  it('rejects reading a property that was never created with an ApiError', async () => {
    const error = await client.userProperties
      .getUserProperty({ userId, key: `cfjs-never-${runId()}` })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});
