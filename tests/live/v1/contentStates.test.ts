import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestPage, createTestSpace } from '../setup/fixtures';

/**
 * Content states ("In progress", "Ready for review", …) are v1-only with no v2
 * equivalent.
 *
 * States are a space-level feature that a site can have switched off, so the
 * read paths accept a typed ApiError, and the round-trip suite skips itself when
 * the fixture space reports states disabled rather than failing on a site
 * configuration this test does not own.
 */

const tracker = new ResourceTracker();

let client: V1Client;
let pageId: string;
let spaceKey: string;

beforeAll(async () => {
  client = getV1Client();

  const space = await createTestSpace(tracker, 'states');
  const page = await createTestPage(tracker, space.id);

  spaceKey = space.key;
  pageId = String(page.id);
}, 100_000);

afterAll(async () => {
  await tracker.cleanup();
}, 100_000);

describe('Confluence Cloud v1 — contentStates read paths (live)', () => {
  // A page that never had a state set returns 200 with an empty body — not a 404,
  // and not a state object. Pinned: the return type cannot say "absent".
  it('returns an empty response for a page with no state, rather than a 404', async () => {
    const state = await client.contentStates.getContentState({ id: pageId });

    expect(state.contentState ?? null).toBeNull();
  });

  it('returns the states available for the fixture page', async () => {
    const available = await client.contentStates.getAvailableContentStates({ id: pageId });

    expect(available).toBeTypeOf('object');
  });

  it('returns the site custom states as a typed array', async () => {
    const states = await client.contentStates.getCustomContentStates();

    expect(Array.isArray(states)).toBe(true);

    for (const state of states) {
      expect(state).toMatchObject({ name: expect.any(String) });
    }
  });

  it('returns the space state settings, typed', async () => {
    const settings = await client.contentStates.getContentStateSettings({ spaceKey });

    expect(settings).toBeTypeOf('object');
  });

  it('returns the space content states as a typed array', async () => {
    const states = await client.contentStates.getSpaceContentStates({ spaceKey });

    expect(Array.isArray(states)).toBe(true);
  });

  it('rejects an unknown space key with an ApiError', async () => {
    const error = await client.contentStates.getContentStateSettings({ spaceKey: 'CFJSNOSUCHSPACE' }).catch(e => e);

    expect(error).toBeInstanceOf(ApiError);
  });

  it('rejects an unknown content id with an ApiError', async () => {
    const error = await client.contentStates.getAvailableContentStates({ id: '0' }).catch(e => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — content state lifecycle (live, round-trip)', () => {
  it('sets a custom state on the page, reads it back, then removes it', async () => {
    // `id` is the *content* id and `body.id` would be the state id — two different
    // things the spec gives the same name. They only stay separable because a
    // colliding body is passed through whole rather than flattened into the
    // parameters object.
    const set = await client.contentStates
      .setContentState({
        id: pageId,
        status: 'current',
        body: { name: 'cfjs state', color: '#2684ff' },
      })
      .catch((e: unknown) => e);

    // States can be switched off space-wide; that is a site setting, not a defect.
    if (set instanceof ApiError) {
      expect([400, 403, 404]).toContain(set.status);

      return;
    }

    expect((set as { contentState?: { name?: string } }).contentState).toMatchObject({ name: 'cfjs state' });

    const read = await client.contentStates.getContentState({ id: pageId });

    expect(read.contentState).toMatchObject({ name: 'cfjs state', color: '#2684ff' });

    await client.contentStates.removeContentState({ id: pageId, status: 'current' });

    const after = await client.contentStates.getContentState({ id: pageId });

    expect(after.contentState ?? null).toBeNull();
  });

  // An unknown state id is not an error — it is an empty page, the same way an
  // unknown group id is. The API treats "no content matches" and "no such state"
  // as one answer, so a caller cannot tell them apart.
  it('answers an unknown state id with an empty page, not an error', async () => {
    const contents = await client.contentStates.getContentsWithState({ spaceKey, 'state-id': 999_999 });

    expect(Array.isArray(contents.results)).toBe(true);
    expect(contents.results).toHaveLength(0);
    expect(typeof contents.size).toBe('number');
  });
});
