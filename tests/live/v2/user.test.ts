import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { createV2Client } from '#/v2';
import { getV2Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestSpace, createTestPage } from '../setup/fixtures';

/**
 * Live integration suite for the Confluence Cloud v2 `user` API
 * (`createBulkUserLookup`, `checkAccessByEmail`, `inviteByEmail`).
 *
 * The `user` module has no GET endpoint that surfaces the *current* account, so
 * the suite bootstraps a real accountId the only way the v2 client can: it
 * creates a space + page fixture and reads `page.authorId` — the account ID of
 * the user who created the content, i.e. the credentials behind the client. That
 * id then drives the bulk-lookup contract assertions.
 *
 * The assertions verify the *contract* of each function, not merely that a call
 * resolves: the user returned from a bulk lookup is typed exactly as the
 * `UserSchema` Zod model declares and round-trips the requested accountId; the
 * access-check response is the typed `AccessByEmail` shape; and the two
 * admin-sensitive endpoints (`checkAccessByEmail`, `inviteByEmail`) are still
 * *called* — exercising serialization + typing — but guarded so an admin-gated
 * site surfaces a typed `ApiError` instead of hard-failing the suite.
 *
 * SAFETY — `inviteByEmail` can send a REAL invitation email and provision a new
 * user. This suite therefore invites ONLY the account's own email
 * (`process.env.EMAIL`), which already belongs to the site: per the endpoint's
 * own contract ("no action is taken for emails that already have access") this
 * is a no-op that creates no new user and sends no invite. A fabricated external
 * address is NEVER used.
 *
 * Shared infrastructure (see `./setup` and `./helpers`):
 *   - `getV2Client()` — singleton v2 client (host + retry policy);
 *   - `ResourceTracker` — LIFO teardown, retried;
 *   - `createTestSpace` / `createTestPage` — self-cleaning fixtures.
 */

const ACCOUNT_TYPES = ['atlassian', 'app', 'customer', 'unknown'] as const;
const ACCOUNT_STATUSES = ['active', 'inactive', 'closed', 'unknown'] as const;

let client: ReturnType<typeof createV2Client>;
const tracker = new ResourceTracker();

/** The current account's accountId, discovered from a created page's author. */
let authorId: string;
/** The current account's email (basic-auth identity, owns the site). */
const ownEmail = process.env.EMAIL ?? '';

beforeAll(async () => {
  client = getV2Client();

  const space = await createTestSpace(tracker, 'user');
  const page = await createTestPage(tracker, space.id, { title: 'user-author-probe' });

  // `authorId` is the account ID of the user who created the page — i.e. the
  // credentials driving this client. It is the one real accountId we can mint
  // without an admin-only user-directory endpoint.
  expect(typeof page.authorId, 'created page must expose the author accountId').toBe('string');
  expect(page.authorId).toBeTruthy();
  authorId = page.authorId!;
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — user.createBulkUserLookup (live)', () => {
  it('returns a typed User for the requested accountId, round-tripping the id', async () => {
    const lookup = await client.user.createBulkUserLookup({ body: { accountIds: [authorId] } });

    expect(Array.isArray(lookup.results)).toBe(true);
    expect(lookup.results!.length).toBeGreaterThan(0);

    const user = lookup.results!.find(u => u.accountId === authorId);
    expect(user, 'the requested accountId must be present in the lookup results').toBeDefined();

    // accountId is the join key and must be a non-empty string.
    expect(typeof user!.accountId).toBe('string');
    expect(user!.accountId).toBe(authorId);

    // displayName is the human label every real user carries.
    expect(typeof user!.displayName).toBe('string');
    expect(user!.displayName).toBeTruthy();

    // accountType / accountStatus are closed enums in the model — when present
    // the live value must be a member.
    if (user!.accountType !== undefined) expect(ACCOUNT_TYPES).toContain(user!.accountType);

    if (user!.accountStatus !== undefined) expect(ACCOUNT_STATUSES).toContain(user!.accountStatus);

    // email is `z.string().optional()` and (per the model doc) may be an empty
    // string under a privacy setting — so only its *type* is guaranteed.
    if (user!.email !== undefined) expect(typeof user!.email).toBe('string');

    // profilePicture is `IconSchema.nullish()`: absent, null, or a typed Icon.
    if (user!.profilePicture != null) {
      expect(typeof user!.profilePicture.path).toBe('string');
      expect(typeof user!.profilePicture.isDefault).toBe('boolean');
    }
  });

  it('returns no matching user for a non-existent accountId', async () => {
    // A syntactically-plausible but unused account id: the endpoint silently
    // omits unknown ids rather than erroring, so the requested id is simply absent.
    const bogus = '000000:00000000-0000-0000-0000-000000000000';

    const lookup = await client.user.createBulkUserLookup({ body: { accountIds: [bogus] } });

    expect(Array.isArray(lookup.results)).toBe(true);
    expect(lookup.results!.some(u => u.accountId === bogus)).toBe(false);
  });
});

describe('Confluence Cloud v2 — user.checkAccessByEmail (live, gated-graceful)', () => {
  it('reports the account\'s own email as having access, or surfaces a typed ApiError when admin-gated', async () => {
    expect(ownEmail, 'EMAIL must be set for the user suite').toBeTruthy();

    try {
      const access = await client.user.checkAccessByEmail({ body: { emails: [ownEmail] } });

      // Typed `AccessByEmail`: both fields are optional string arrays.
      if (access.emailsWithoutAccess !== undefined) {
        expect(Array.isArray(access.emailsWithoutAccess)).toBe(true);
        access.emailsWithoutAccess.forEach(e => expect(typeof e).toBe('string'));
        // The credentials' own email demonstrably *has* access to the site.
        expect(access.emailsWithoutAccess).not.toContain(ownEmail);
      }

      if (access.invalidEmails !== undefined) {
        expect(Array.isArray(access.invalidEmails)).toBe(true);
        access.invalidEmails.forEach(e => expect(typeof e).toBe('string'));
        // A valid, site-owning email must not be flagged invalid.
        expect(access.invalidEmails).not.toContain(ownEmail);
      }
    } catch (error) {
      // The endpoint is org-admin sensitive on some sites; accept a typed gate.
      expect(error).toBeInstanceOf(ApiError);
      expect([401, 403, 404]).toContain((error as ApiError).status);
    }
  });
});

describe('Confluence Cloud v2 — user.inviteByEmail (live, gated-graceful, SAFE)', () => {
  it('accepts the account\'s own (already-onboarded) email as a no-op, or surfaces a typed ApiError', async () => {
    expect(ownEmail, 'EMAIL must be set for the user suite').toBeTruthy();

    // SAFETY: only the account's own email is invited. It already has site
    // access, so per the endpoint contract no invite is sent and no user is
    // created. We assert the call *types/serializes* and resolves (void) or
    // fails with a typed admin gate — never that a new invite was created.
    try {
      const result = await client.user.inviteByEmail({ body: { emails: [ownEmail] } });

      // The model declares `Promise<void>`: a successful (async-accepted) call
      // resolves with no body.
      expect(result).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect([401, 403, 404]).toContain((error as ApiError).status);
    }
  });
});
