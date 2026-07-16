import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { createV2Client } from '#/v2';
import { getV2Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';

/**
 * Live integration suite for the Confluence Cloud v2 `adminKey` API
 * (`getAdminKey`, `enableAdminKey`, `disableAdminKey`).
 *
 * The "admin key" is an *organization / site admin* feature that grants elevated
 * access for a short, self-expiring window. On a standard Cloud site — or with a
 * token that is not an org-or-site admin — every endpoint here is gated and the
 * server answers 403/404. This suite is therefore written **gated-graceful**:
 * every method is still CALLED (to exercise typing + request serialization), but
 * each assertion accepts BOTH branches:
 *
 *   - the feature is available → the response is a typed `AdminKey`
 *     (`AdminKeySchema`: `accountId?: string`, `expirationTime?: Date`), or a
 *     `void` for `disableAdminKey`; or
 *   - the feature is gated     → a typed `ApiError` with status 403 or 404.
 *
 * SAFETY: enabling an admin key grants elevated access. If `enableAdminKey`
 * succeeds we register `disableAdminKey` on the {@link ResourceTracker} so the
 * site is restored to its prior state on teardown, no matter how the run exits.
 *
 * Shared infrastructure (see `./setup`):
 *   - `getV2Client()` — singleton v2 client (host + retry policy);
 *   - `ResourceTracker` — LIFO, retried teardown.
 */

let client: ReturnType<typeof createV2Client>;
/** The shape returned by the admin-key endpoints, derived from the client. */
type AdminKey = Awaited<ReturnType<typeof client.adminKey.getAdminKey>>;

const tracker = new ResourceTracker();

/** Whether this token can actually enable an admin key — set by the enable suite. */
let enableSucceeded = false;

/** Asserts a value is a structurally valid `AdminKey` per `AdminKeySchema`. */
function expectWellFormedAdminKey(key: AdminKey) {
  // `AdminKeySchema` is a *loose* `apiObject`: declared fields are typed (extras
  // are preserved at runtime but untyped). Both declared fields are optional.
  expect(key).toBeTypeOf('object');
  expect(key).not.toBeNull();

  if (key.accountId !== undefined) {
    expect(typeof key.accountId).toBe('string');
    expect(key.accountId.length).toBeGreaterThan(0);
  }

  if (key.expirationTime !== undefined) {
    // Declared `z.coerce.date()` → a parsed response yields a real Date.
    expect(key.expirationTime).toBeInstanceOf(Date);
    expect(Number.isNaN(key.expirationTime.getTime())).toBe(false);
  }
}

/** Asserts an error is the typed `ApiError` an org-admin-gated endpoint throws. */
function expectGatedApiError(error: unknown) {
  expect(error).toBeInstanceOf(ApiError);
  expect([403, 404]).toContain((error as ApiError).status);
}

beforeAll(() => {
  client = getV2Client();
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — adminKey.getAdminKey (live, gated-graceful)', () => {
  it('returns either a typed AdminKey or a typed 403/404 ApiError when gated', async () => {
    let result: AdminKey | undefined;
    let caught: unknown;

    try {
      // No params: `getAdminKey(client)` issues `GET /admin-key`.
      result = await client.adminKey.getAdminKey();
    } catch (error) {
      caught = error;
    }

    if (caught !== undefined) {
      // Gated: caller is not an org/site admin, or no key is currently enabled.
      expectGatedApiError(caught);
    } else {
      // A key is enabled and visible: the model must be honored exactly.
      expect(result).toBeDefined();
      expectWellFormedAdminKey(result!);
    }
  });
});

describe('Confluence Cloud v2 — adminKey.enableAdminKey (live, gated-graceful, self-restoring)', () => {
  let enabled: AdminKey | undefined;
  let caught: unknown;

  beforeAll(async () => {
    try {
      // Body is optional; `durationInMinutes` controls the window (0/empty → 10m
      // default). `EnableAdminKeySchema.body` is a free-form `Record<string, any>`.
      enabled = await client.adminKey.enableAdminKey({ body: { durationInMinutes: 10 } });
      enableSucceeded = true;

      // SAFETY / cleanup: an enabled admin key must always be revoked afterwards.
      tracker.defer(async () => {
        await client.adminKey.disableAdminKey().catch(() => undefined);
      });
    } catch (error) {
      caught = error;
    }
  });

  it('either issues a typed AdminKey or fails with a typed 403/404 ApiError', () => {
    if (enableSucceeded) {
      expect(enabled).toBeDefined();
      expectWellFormedAdminKey(enabled!);
    } else {
      expectGatedApiError(caught);
    }
  });

  it('makes getAdminKey report an active key once enabled', async () => {
    if (!enableSucceeded) return; // gated: nothing was enabled, nothing to observe

    const active = await client.adminKey.getAdminKey();

    expectWellFormedAdminKey(active);
    // An active key identifies the calling user and carries a future expiry.
    expect(active.accountId).toBeTruthy();
    expect(active.expirationTime).toBeInstanceOf(Date);
    // Allow a minute of clock skew; the key was just (re)issued.
    expect(active.expirationTime!.getTime()).toBeGreaterThan(Date.now() - 60_000);
  });
});

describe('Confluence Cloud v2 — adminKey.disableAdminKey (live, gated-graceful)', () => {
  it('revokes the active key (when enabled) or fails with a typed ApiError when gated', async () => {
    if (enableSucceeded) {
      // Explicitly exercise disable; `disableAdminKey(client)` issues
      // `DELETE /admin-key` and resolves `void`.
      await expect(client.adminKey.disableAdminKey()).resolves.toBeUndefined();

      // After revocation getAdminKey should no longer surface an active key:
      // tolerate either a 404 (typical) or a still-well-formed shell.
      let caught: unknown;
      try {
        const after = await client.adminKey.getAdminKey();
        expectWellFormedAdminKey(after);
      } catch (error) {
        caught = error;
      }

      if (caught !== undefined) {
        expect(caught).toBeInstanceOf(ApiError);
        expect((caught as ApiError).status).toBe(404);
      }
    } else {
      // Gated: still call it to prove typing/serialization; accept a void
      // resolution OR a typed 403/404 ApiError, nothing else.
      let caught: unknown;
      try {
        await client.adminKey.disableAdminKey();
      } catch (error) {
        caught = error;
      }

      if (caught !== undefined) {
        expectGatedApiError(caught);
      } else {
        // A void resolution is itself the contract: the request was accepted.
        expect(caught).toBeUndefined();
      }
    }
  });
});
