import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestSpace } from '../setup/fixtures';

/**
 * Look-and-feel settings, themes and space settings — all v1-only, all with no v2
 * equivalent.
 *
 * Read paths against the site, plus writes scoped to a disposable fixture space.
 * Nothing here touches the global look and feel: that is site-wide state on a
 * shared tenant, and a failed test would leave the site visibly altered.
 */

const tracker = new ResourceTracker();

let client: V1Client;
let spaceKey: string;

beforeAll(async () => {
  client = getV1Client();
  spaceKey = (await createTestSpace(tracker, 'settings')).key;
}, 100_000);

afterAll(async () => {
  await tracker.cleanup();
}, 100_000);

describe('Confluence Cloud v1 — settings.getLookAndFeelSettings (live)', () => {
  it('returns typed global and custom look-and-feel blocks', async () => {
    const settings = await client.settings.getLookAndFeelSettings({});

    expect(settings.global).toBeDefined();
    expect(settings.global.headings).toBeDefined();
    expect(typeof settings.global.headings.color).toBe('string');
  });

  it('returns the space look-and-feel when scoped to a space key', async () => {
    const settings = await client.settings.getLookAndFeelSettings({ spaceKey });

    expect(settings.global).toBeDefined();
    // A fresh space inherits the site theme, so `custom` may legitimately be absent.
    if (settings.custom !== undefined) expect(settings.custom).toBeTypeOf('object');
  });

  it('rejects an unknown space key with an ApiError', async () => {
    const error = await client.settings
      .getLookAndFeelSettings({ spaceKey: 'CFJSNOSUCHSPACE' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — settings.getSystemInfo (live, gated-graceful)', () => {
  it('returns typed system info, or a typed ApiError without admin rights', async () => {
    try {
      const info = await client.settings.getSystemInfo();

      expect(typeof info.cloudId).toBe('string');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });
});

describe('Confluence Cloud v1 — themes (live)', () => {
  it('returns a typed page of themes', async () => {
    const themes = await client.themes.getThemes({});

    expect(Array.isArray(themes.results)).toBe(true);

    for (const theme of themes.results) {
      expect(theme).toMatchObject({ themeKey: expect.any(String) });
    }
  });

  it('honors `limit`', async () => {
    const themes = await client.themes.getThemes({ limit: 1 });

    expect(themes.results.length).toBeLessThanOrEqual(1);
  });

  // A site on the default theme has no global theme *object* — the endpoint 404s
  // rather than returning a default. Same for a space that never set one. Both
  // states are normal, so both suites accept either, and pin that "no theme" is a
  // typed 404 and not an empty body.
  it('returns the global theme when one is set, or a typed 404 when the site uses the default', async () => {
    try {
      const theme = await client.themes.getGlobalTheme();

      expect(typeof theme.themeKey).toBe('string');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect((error as ApiError).status).toBe(404);
    }
  });

  it('returns the space theme when one is set, or a typed 404 for a fresh space', async () => {
    try {
      const theme = await client.themes.getSpaceTheme({ spaceKey });

      expect(typeof theme.themeKey).toBe('string');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect((error as ApiError).status).toBe(404);
    }
  });

  it('rejects an unknown theme key with an ApiError', async () => {
    const error = await client.themes.getTheme({ themeKey: 'cfjs.no.such.theme' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect([400, 404]).toContain((error as ApiError).status);
  });
});

describe('Confluence Cloud v1 — spaceSettings (live, scoped to a fixture space)', () => {
  it('returns typed settings for the fixture space', async () => {
    const settings = await client.spaceSettings.getSpaceSettings({ spaceKey });

    expect(typeof settings.routeOverrideEnabled).toBe('boolean');
  });

  it('round-trips an update — the read-back matches what was written', async () => {
    const before = await client.spaceSettings.getSpaceSettings({ spaceKey });
    const flipped = !before.routeOverrideEnabled;

    await client.spaceSettings.updateSpaceSettings({ spaceKey, routeOverrideEnabled: flipped });

    const after = await client.spaceSettings.getSpaceSettings({ spaceKey });

    expect(after.routeOverrideEnabled).toBe(flipped);
  });

  it('rejects an unknown space key with an ApiError', async () => {
    const error = await client.spaceSettings.getSpaceSettings({ spaceKey: 'CFJSNOSUCHSPACE' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});
