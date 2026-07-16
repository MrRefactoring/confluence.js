import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '@confluence.js/core';
import type { createCloudV2Client } from '@confluence.js/cloud';
import { getLiveClient } from './setup/client';
import { ResourceTracker } from './setup/resources';
import { createTestSpace, createTestPage, createTestBlogPost } from './setup/fixtures';

/**
 * Live integration suite for the Confluence Cloud v2 `redactions` API
 * (`postRedactPage`, `postRedactBlog`).
 *
 * This is a PREMIUM, ENVIRONMENT-GATED module — both endpoints require
 * **Atlassian Guard Premium** and PERMANENTLY alter content. On a standard
 * Cloud site they are expected to surface a typed `ApiError`
 * (401/403/404, or 451/501 where the feature is unprovisioned; 400 for a body
 * the non-premium endpoint rejects outright).
 *
 * SAFETY: redaction is destructive, so the calls target ONLY disposable
 * fixtures — a throwaway page and a throwaway blog post created in a throwaway
 * space, all auto-deleted on cleanup. Even on the success branch the mutated
 * content is disposable. No shared or pre-existing content is ever touched.
 *
 * Both methods are exercised gated-gracefully: each is CALLED (so request
 * serialization + the Zod `RedactionResponse` parse are type-checked end to
 * end) and the result is asserted to be either the exact typed shape OR a typed
 * `ApiError`.
 *
 * Shared infrastructure (see `./setup` and `./helpers`):
 *   - `getLiveClient()` — singleton v2 client;
 *   - `ResourceTracker` — LIFO teardown;
 *   - `createTestSpace` / `createTestPage` / `createTestBlogPost` — self-cleaning fixtures.
 */

const GATED_STATUSES = [400, 401, 403, 404, 451, 501] as const;

/** A plausible redaction request body (the param body is an opaque record). */
const REDACT_BODY = { redactions: [{ pointer: '/body', from: 0, to: 1, reason: 'cfjs live test' }] };

let client: ReturnType<typeof createCloudV2Client>;
const tracker = new ResourceTracker();

let pageId: number;
let blogId: number;

/** Structural contract check for a `RedactionResponse` (used on the success branch). */
function expectWellFormedRedactionResponse(response: { body?: unknown; title?: unknown }) {
  expect(typeof response).toBe('object');

  // `body` / `title` are `RedactionSection.nullish()` — absent, null, or a
  // section whose `redactions` is a nullish array of typed pointer responses.
  for (const section of [response.body, response.title]) {
    if (section != null) {
      const redactions = (section as { redactions?: unknown }).redactions;

      if (redactions != null) {
        expect(Array.isArray(redactions)).toBe(true);
        (redactions as Array<Record<string, unknown>>).forEach(r => {
          if (r.pointer !== undefined) expect(typeof r.pointer).toBe('string');

          if (r.from !== undefined) expect(typeof r.from).toBe('number');

          if (r.to !== undefined) expect(typeof r.to).toBe('number');

          if (r.reason !== undefined) expect(typeof r.reason).toBe('string');

          if (r.redactionId !== undefined) expect(typeof r.redactionId).toBe('string');
        });
      }
    }
  }
}

beforeAll(async () => {
  client = getLiveClient();

  const space = await createTestSpace(tracker, 'redact');
  const page = await createTestPage(tracker, space.id, {
    title: 'redact-page-probe',
    html: '<p>sensitive content to redact</p>',
  });
  const blog = await createTestBlogPost(tracker, space.id, {
    title: 'redact-blog-probe',
    html: '<p>sensitive content to redact</p>',
  });

  pageId = Number(page.id);
  blogId = Number(blog.id);
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — redactions.postRedactPage (live, premium-gated, SAFE)', () => {
  it('redacts the disposable fixture page returning a typed RedactionResponse, or a typed ApiError', async () => {
    try {
      const response = await client.redactions.postRedactPage({ id: pageId, body: REDACT_BODY });
      expectWellFormedRedactionResponse(response);
    } catch (error) {
      // Premium gate (Atlassian Guard Premium) on a standard site.
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });
});

describe('Confluence Cloud v2 — redactions.postRedactBlog (live, premium-gated, SAFE)', () => {
  it('redacts the disposable fixture blog post returning a typed RedactionResponse, or a typed ApiError', async () => {
    try {
      const response = await client.redactions.postRedactBlog({ id: blogId, body: REDACT_BODY });
      expectWellFormedRedactionResponse(response);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(GATED_STATUSES).toContain((error as ApiError).status);
    }
  });
});
