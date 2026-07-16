import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '@confluence.js/core';
import type { createCloudV2Client } from '@confluence.js/cloud';
import { getLiveClient } from './setup/client';
import { ResourceTracker } from './setup/resources';
import { testName } from './helpers/naming';

/**
 * Live integration suite for the Confluence Cloud v2 `appProperties` API
 * (`getForgeAppProperties`, `getForgeAppProperty`, `putForgeAppProperty`,
 * `deleteForgeAppProperty`).
 *
 * This is a FORGE-APP-SCOPED, ENVIRONMENT-GATED module. The endpoints are
 * documented as accessible ONLY via `asApp()` requests from a Forge app — there
 * is no app context behind the live suite's basic-auth (user) credentials, so
 * on a standard Cloud site EVERY call is expected to surface a typed `ApiError`
 * (almost certainly 401/403/404; 451/501 accepted where the surface is entirely
 * absent). The gated narrative is the point of this suite: each method is still
 * CALLED (so request serialization + the Zod `ForgeAppProperties` /
 * `ForgeAppProperty` parse are type-checked end to end), and the result is
 * asserted to be either the exact typed shape OR a typed `ApiError`. A success
 * branch is provided for completeness should the credentials ever carry an app
 * context, but the realistic outcome on basic auth is the gate.
 *
 * Shared infrastructure (see `./setup` and `./helpers`):
 *   - `getLiveClient()` — singleton v2 client;
 *   - `ResourceTracker` — LIFO teardown;
 *   - `testName()` — run-scoped, marker-tagged unique property key.
 */

const GATED_STATUSES = [400, 401, 403, 404, 451, 501] as const;

let client: ReturnType<typeof createCloudV2Client>;
const tracker = new ResourceTracker();

/** A run-scoped, marker-tagged property key (Forge property keys allow these chars). */
const propertyKey = testName('app-prop').replace(/[^A-Za-z0-9._-]/g, '-');
const propertyValue = { marker: 'cfjs', enabled: true };

beforeAll(() => {
  client = getLiveClient();

  // Best-effort cleanup in case the credentials unexpectedly carry an app
  // context and the property is actually created.
  tracker.defer(async () => {
    await client.appProperties.deleteForgeAppProperty({ propertyKey }).catch(() => undefined);
  });
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — appProperties.getForgeAppProperties (live, forge-gated)', () => {
  it('lists app properties as a typed page, or surfaces a typed ApiError without an app context', async () => {
    try {
      const page = await client.appProperties.getForgeAppProperties({ limit: 10 });

      // `ForgeAppPropertiesSchema`: optional `results` of `{ key?, value? }` + `_links`.
      expect(typeof page).toBe('object');

      if (page.results !== undefined) {
        expect(Array.isArray(page.results)).toBe(true);
        page.results.forEach(prop => {
          if (prop.key !== undefined) expect(typeof prop.key).toBe('string');

          if (prop.value !== undefined) expect(typeof prop.value).toBe('object');
        });
      }

      if (page._links !== undefined) expect(typeof page._links).toBe('object');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });
});

describe('Confluence Cloud v2 — appProperties property lifecycle (live, forge-gated)', () => {
  it('putForgeAppProperty creates/updates a property, or surfaces a typed ApiError', async () => {
    try {
      const result = await client.appProperties.putForgeAppProperty({ propertyKey, body: propertyValue });
      // Declared `Promise<void>` — success resolves with no body.
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });

  it('getForgeAppProperty fetches the property by key as a typed ForgeAppProperty, or a typed ApiError', async () => {
    try {
      const prop = await client.appProperties.getForgeAppProperty({ propertyKey });

      // `ForgeAppPropertySchema`: `{ key?, value? }`. When the property round-trips
      // it must carry the key we wrote and an object value.
      expect(typeof prop).toBe('object');

      if (prop.key !== undefined) {
        expect(typeof prop.key).toBe('string');
        expect(prop.key).toBe(propertyKey);
      }

      if (prop.value !== undefined) expect(typeof prop.value).toBe('object');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });

  it('deleteForgeAppProperty removes the property, or surfaces a typed ApiError', async () => {
    try {
      const result = await client.appProperties.deleteForgeAppProperty({ propertyKey });
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });
});
