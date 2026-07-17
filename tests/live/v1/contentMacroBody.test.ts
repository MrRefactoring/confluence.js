import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client, getV2Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestPage, createTestSpace } from '../setup/fixtures';

/**
 * Macro bodies are v1-only, addressed by `(contentId, version, macroId)`.
 *
 * The fixture page carries a real storage-format macro with a known `macro-id`,
 * so the lookup has something to find. The macro id is the one *in the storage
 * XML*, not one the API hands out — which is exactly the part worth pinning.
 */

const MACRO_ID = 'cfjs-macro-0000-0000-0000-000000000001';

const tracker = new ResourceTracker();

let client: V1Client;
let pageId: string;
let version: number;

beforeAll(async () => {
  client = getV1Client();

  const space = await createTestSpace(tracker, 'macro');
  const page = await createTestPage(tracker, space.id, {
    html:
      `<ac:structured-macro ac:name="info" ac:schema-version="1" ac:macro-id="${MACRO_ID}">` +
      '<ac:rich-text-body><p>cfjs macro body</p></ac:rich-text-body>' +
      '</ac:structured-macro>',
  });

  pageId = String(page.id);
  version = (await getV2Client().page.getPageById({ id: Number(pageId) })).version?.number ?? 1;
}, 100_000);

afterAll(async () => {
  await tracker.cleanup();
}, 100_000);

describe('Confluence Cloud v1 — contentMacroBody.getMacroBodyByMacroId (live)', () => {
  it('returns the macro body for the id embedded in the page storage', async () => {
    const macro = await client.contentMacroBody.getMacroBodyByMacroId({ id: pageId, version, macroId: MACRO_ID });

    // The macro is returned as an *instance* — its name, rendered body and the
    // parameters it was called with — not as a content body with a representation.
    expect(macro.name).toBe('info');
    expect(macro.body).toContain('cfjs macro body');
    expect(macro.parameters).toBeTypeOf('object');
  });

  it('rejects an unknown macro id with an ApiError', async () => {
    const error = await client.contentMacroBody
      .getMacroBodyByMacroId({ id: pageId, version, macroId: 'cfjs-no-such-macro' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });

  it('rejects an unknown version with an ApiError', async () => {
    const error = await client.contentMacroBody
      .getMacroBodyByMacroId({ id: pageId, version: 999, macroId: MACRO_ID })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });

  it('rejects an unknown content id with an ApiError', async () => {
    const error = await client.contentMacroBody
      .getMacroBodyByMacroId({ id: '0', version: 1, macroId: MACRO_ID })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — contentMacroBody conversion (live, gated-graceful)', () => {
  it('converts the macro body to a rendered representation, or surfaces a typed ApiError', async () => {
    try {
      const converted = await client.contentMacroBody.getAndConvertMacroBodyByMacroId({
        id: pageId,
        version,
        macroId: MACRO_ID,
        to: 'export_view',
      });

      expect(converted).toBeTypeOf('object');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });

  it('submits an async macro-body conversion, or surfaces a typed ApiError', async () => {
    try {
      const submitted = await client.contentMacroBody.getAndAsyncConvertMacroBodyByMacroId({
        id: pageId,
        version,
        macroId: MACRO_ID,
        to: 'export_view',
      });

      expect(submitted).toBeTypeOf('object');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });
});
