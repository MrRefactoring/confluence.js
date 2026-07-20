import { describe, it, expect, beforeAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';

/**
 * Dynamic modules belong to Atlassian Connect apps: the endpoints authenticate as
 * the *app*, via JWT, not as a user. A basic-auth token therefore cannot register
 * anything here, and 3.0 does not support JWT at all — Connect apps stay on 2.x.
 *
 * That makes this suite deliberately narrow. It pins that the methods exist,
 * reach the right endpoints, and refuse a user token in a typed way, rather than
 * pretending to exercise a flow this client cannot perform. Registering a real
 * module would also be site-wide state an app owns.
 */

let client: V1Client;

beforeAll(() => {
  client = getV1Client();
});

describe('Confluence Cloud v1 — dynamicModules (live, app-authenticated)', () => {
  it('refuses getModules for a user token, in a typed way', async () => {
    const error = await client.dynamicModules.getModules().catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect([401, 403, 404]).toContain((error as ApiError).status);
  });

  it('refuses registerModules for a user token, in a typed way', async () => {
    const error = await client.dynamicModules
      .registerModules({ body: { webItems: [] } })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect([400, 401, 403, 404]).toContain((error as ApiError).status);
  });

  it('refuses removeModules for a user token, in a typed way', async () => {
    const error = await client.dynamicModules.removeModules({ moduleKey: ['cfjs-no-such-module'] }).catch(e => e);

    expect(error).toBeInstanceOf(ApiError);
    expect([401, 403, 404]).toContain((error as ApiError).status);
  });
});
