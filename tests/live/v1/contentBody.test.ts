import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestPage, createTestSpace } from '../setup/fixtures';
import { waitFor } from '../helpers/poll';

/**
 * Body conversion (storage → export_view) is v1-only. The synchronous
 * `convertContentBody` that 2.x had is gone from the spec; what remains is the
 * async pair — submit a request, poll for the result — plus their bulk siblings.
 *
 * Conversion needs a space to resolve macros and links against, so everything
 * runs against a disposable fixture space.
 */

const tracker = new ResourceTracker();

let client: V1Client;
let spaceKey: string;
let pageId: string;

beforeAll(async () => {
  client = getV1Client();

  const space = await createTestSpace(tracker, 'body');
  const page = await createTestPage(tracker, space.id, { html: '<p>convert <strong>me</strong></p>' });

  spaceKey = space.key;
  pageId = String(page.id);
}, 100_000);

afterAll(async () => {
  await tracker.cleanup();
}, 100_000);

describe('Confluence Cloud v1 — async body conversion (live, round-trip)', () => {
  it('submits a conversion and polls the result back as rendered HTML', async () => {
    const submitted = await client.contentBody.asyncConvertContentBodyRequest({
      to: 'export_view',
      spaceKeyContext: spaceKey,
      contentIdContext: pageId,
      value: '<p>hello <strong>world</strong></p>',
      representation: 'storage',
    });

    expect(submitted.asyncId).toBeTruthy();

    // The submit only hands back an id — the conversion itself is asynchronous.
    // Note the asymmetry: it is returned as `asyncId` but taken back as `id`.
    const converted = await waitFor(
      () => client.contentBody.asyncConvertContentBodyResponse({ id: submitted.asyncId }),
      value => Boolean(value.value),
      { maxAttempts: 8, initialDelayMs: 700 },
    );

    expect(converted.value).toContain('world');
  }, 60_000);

  it('rejects an unknown conversion id with an ApiError', async () => {
    const error = await client.contentBody
      .asyncConvertContentBodyResponse({ id: 'cfjs-no-such-conversion' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });

  it('rejects an unsupported representation with an ApiError', async () => {
    const error = await client.contentBody
      .asyncConvertContentBodyRequest({
        to: 'export_view',
        spaceKeyContext: spaceKey,
        value: '<p>nope</p>',
        representation: 'view',
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — bulk async body conversion (live, gated-graceful)', () => {
  it('submits a bulk conversion and polls it back, or surfaces a typed ApiError', async () => {
    try {
      const submitted = await client.contentBody.bulkAsyncConvertContentBodyRequest({
        conversionInputs: [
          {
            to: 'export_view',
            spaceKeyContext: spaceKey,
            body: { value: '<p>bulk one</p>', representation: 'storage' },
          },
        ],
      });

      // The bulk submit answers with one `{ asyncId }` per input — an array, not an
      // object — and the response endpoint takes the whole set back as `ids`.
      expect(Array.isArray(submitted)).toBe(true);
      expect(submitted.length).toBeGreaterThan(0);

      const converted = await client.contentBody.bulkAsyncConvertContentBodyResponse({
        ids: submitted.map(entry => entry.asyncId),
      });

      expect(converted).toBeTypeOf('object');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  }, 60_000);
});
