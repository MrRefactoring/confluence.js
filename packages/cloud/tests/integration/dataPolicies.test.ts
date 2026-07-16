import { describe, it, expect, beforeAll } from 'vitest';
import { ApiError } from '@confluence.js/core';
import type { createCloudV2Client } from '@confluence.js/cloud';
import { getLiveClient } from './setup/client';

/**
 * Live integration suite for the Confluence Cloud v2 `dataPolicies` API
 * (`getDataPolicyMetadata`, `getDataPolicySpaces`).
 *
 * This is an ENVIRONMENT-GATED module. Both endpoints are documented as
 * *"Only apps can make this request"* (org-level data-residency metadata,
 * available through an app/Forge context with the relevant org-admin setup).
 * The live suite authenticates with basic auth (a user identity, not an app),
 * so on a standard Cloud site these calls are expected to surface a typed
 * `ApiError` (401/403/404 — the app-only gate, or 451 when data residency is
 * actively blocking). The suite therefore exercises BOTH branches: each method
 * is still CALLED (so request serialization + the Zod response parse are
 * type-checked end to end), and the result is asserted to be either the exact
 * typed success shape OR a typed `ApiError` with an expected status. A gated
 * endpoint never hard-fails the suite.
 *
 * Shared infrastructure (see `./setup` and `./helpers`):
 *   - `getLiveClient()` — singleton v2 client (host + retry policy).
 */

/** Statuses an app-only / data-residency endpoint may legitimately return for a non-app caller. */
const GATED_STATUSES = [401, 403, 404, 451, 501] as const;

let client: ReturnType<typeof createCloudV2Client>;

beforeAll(() => {
  client = getLiveClient();
});

describe('Confluence Cloud v2 — dataPolicies.getDataPolicyMetadata (live, gated-graceful)', () => {
  it('returns typed workspace data-policy metadata, or surfaces a typed ApiError when app-gated', async () => {
    try {
      const metadata = await client.dataPolicies.getDataPolicyMetadata();

      // `DataPolicyMetadataSchema` declares a single optional boolean
      // (`anyContentBlocked`); a successful parse yields exactly that shape.
      expect(metadata).toBeDefined();
      expect(typeof metadata).toBe('object');

      if (metadata.anyContentBlocked !== undefined) {
        expect(typeof metadata.anyContentBlocked).toBe('boolean');
      }
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });
});

describe('Confluence Cloud v2 — dataPolicies.getDataPolicySpaces (live, gated-graceful)', () => {
  it('returns a typed page of data-policy spaces, or surfaces a typed ApiError when app-gated', async () => {
    try {
      const page = await client.dataPolicies.getDataPolicySpaces({ limit: 5 });

      // `DataPolicySpacesSchema`: optional `results` array + optional `_links`.
      expect(page).toBeDefined();

      if (page.results !== undefined) {
        expect(Array.isArray(page.results)).toBe(true);
        page.results.forEach(space => {
          // Each entry is a `DataPolicySpace`: id/key/name are numeric-string /
          // string ids; `dataPolicy.anyContentBlocked` is the per-space flag.
          if (space.id !== undefined) expect(typeof space.id).toBe('string');

          if (space.key !== undefined) expect(typeof space.key).toBe('string');

          if (space.name !== undefined) expect(typeof space.name).toBe('string');

          if (space.dataPolicy?.anyContentBlocked !== undefined) {
            expect(typeof space.dataPolicy.anyContentBlocked).toBe('boolean');
          }
        });
      }

      // `_links` is the multi-entity links object when present.
      if (page._links !== undefined) expect(typeof page._links).toBe('object');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });

  it('serializes `ids`, `keys`, `sort`, `limit` query params, or gates with a typed ApiError', async () => {
    // Exercises param serialization specifically: `ids` is `z.number()[]` while
    // space ids are numeric strings (the ID gotcha), `sort` is the closed
    // SpaceSortOrder enum, `keys` a string list.
    try {
      const page = await client.dataPolicies.getDataPolicySpaces({
        ids: [1],
        keys: ['DOESNOTEXIST'],
        sort: 'id',
        limit: 1,
      });

      expect(page).toBeDefined();

      if (page.results !== undefined) {
        expect(Array.isArray(page.results)).toBe(true);
        expect(page.results.length).toBeLessThanOrEqual(1);
      }
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });
});
