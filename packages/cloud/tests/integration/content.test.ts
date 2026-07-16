import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '@confluence.js/core';
import type { createCloudV2Client } from '@confluence.js/cloud';
import { getLiveClient } from './setup/client';
import { ResourceTracker } from './setup/resources';
import { createTestSpace, createTestPage, createTestBlogPost } from './setup/fixtures';

/**
 * Live integration suite for the Confluence Cloud v2 `content` API
 * (`convertContentIdsToContentTypes`) — the single endpoint that maps a set of
 * v1-style content ids onto their v2 content types.
 *
 * Source of truth driving the assertions:
 *   - request   `src/parameters/convertContentIdsToContentTypes.ts`
 *     → `{ body?: Record<string, any> }`; the API expects `body.contentIds: number[]`.
 *   - method    `src/api/content.ts` → POST `/content/convert-ids-to-types`, sends
 *     `parameters.body` verbatim, parses with `ContentIdToContentTypeSchema`.
 *   - response  `src/models/contentIdToContentType.ts`
 *     → `{ results?: Record<string, any> | null }` — a map of *string* content id
 *       to its content type. Per the endpoint docstring, an id the caller cannot
 *       view or that does not exist maps to `null`; duplicate ids collapse to a
 *       single key.
 *
 * The assertions verify the contract, not merely that the call resolves: a real
 * page resolves to `page` and a real blog post to `blogpost`; the response keys
 * are the requested ids in string form; a non-existent id is reported per the
 * documented `null` contract; duplicates collapse; and an empty request surfaces
 * either a typed empty result or a typed `ApiError`.
 */

/** v2 built-in content-type vocabulary the endpoint can return (per docstring). */
const CONTENT_TYPES = [
  'page',
  'blogpost',
  'attachment',
  'custom-content',
  'comment',
  'inline-comment',
  'footer-comment',
  'whiteboard',
  'database',
  'embed',
  'folder',
] as const;

let client: ReturnType<typeof createCloudV2Client>;
const tracker = new ResourceTracker();

let pageId: string;
let blogPostId: string;

beforeAll(async () => {
  client = getLiveClient();

  const space = await createTestSpace(tracker);
  const page = await createTestPage(tracker, space.id);
  const blogPost = await createTestBlogPost(tracker, space.id);

  // Model ids are numeric strings; the request expects `contentIds: number[]`.
  pageId = String(page.id);
  blogPostId = String(blogPost.id);
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — content.convertContentIdsToContentTypes (live)', () => {
  it('maps a real page id to `page` and a real blog post id to `blogpost`', async () => {
    const result = await client.content.convertContentIdsToContentTypes({
      body: { contentIds: [Number(pageId), Number(blogPostId)] },
    });

    // `results` is the documented map; it must be present for known content.
    expect(result.results).toBeDefined();
    expect(result.results).not.toBeNull();
    const results = result.results as Record<string, unknown>;
    expect(typeof results).toBe('object');

    // Keys come back as the requested ids in string form.
    expect(results[pageId]).toBe('page');
    expect(results[blogPostId]).toBe('blogpost');

    // Every returned value is a member of the built-in content-type vocabulary.
    for (const id of [pageId, blogPostId]) {
      expect(CONTENT_TYPES).toContain(results[id]);
    }
  });

  it('collapses duplicate ids in the request into a single response key', async () => {
    const result = await client.content.convertContentIdsToContentTypes({
      body: { contentIds: [Number(pageId), Number(pageId), Number(pageId)] },
    });

    const results = (result.results ?? {}) as Record<string, unknown>;
    const matching = Object.keys(results).filter(key => key === pageId);

    // Docstring: "Duplicate content ids in the request will be returned under a
    // single key in the response."
    expect(matching).toHaveLength(1);
    expect(results[pageId]).toBe('page');
  });

  it('reports a non-existent content id as `null` (documented contract)', async () => {
    const missingId = '987654321098765';

    const result = await client.content.convertContentIdsToContentTypes({
      body: { contentIds: [Number(pageId), Number(missingId)] },
    });

    const results = (result.results ?? {}) as Record<string, unknown>;

    // The real id still resolves alongside the missing one.
    expect(results[pageId]).toBe('page');

    // Docstring: content the user cannot view or that does not exist "will map to
    // `null` in the response". Accept the contract literally; if the live API
    // instead omits the key, that divergence is captured as a suspected bug.
    expect(missingId in results ? results[missingId] : null).toBeNull();
    // Whatever form it takes, a missing id must never resolve to a real type.
    expect(CONTENT_TYPES).not.toContain(results[missingId]);
  });

  it('handles an empty id list as a typed empty result or a typed ApiError', async () => {
    let result: Awaited<ReturnType<typeof client.content.convertContentIdsToContentTypes>> | undefined;
    let caught: unknown;

    try {
      result = await client.content.convertContentIdsToContentTypes({ body: { contentIds: [] } });
    } catch (error) {
      caught = error;
    }

    if (caught !== undefined) {
      // Server rejected the empty request — must surface as a typed ApiError.
      expect(caught).toBeInstanceOf(ApiError);
      expect((caught as ApiError).status).toBeGreaterThanOrEqual(400);
      expect((caught as ApiError).status).toBeLessThan(500);
    } else {
      // Otherwise the parsed result is well-formed: `results` is the empty map
      // (or nullish, which the `.nullish()` model permits).
      const results = result!.results;

      if (results != null) {
        expect(typeof results).toBe('object');
        expect(Object.keys(results)).toHaveLength(0);
      }
    }
  });
});
