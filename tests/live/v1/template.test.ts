import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestSpace } from '../setup/fixtures';
import { testName } from '../helpers/naming';

/**
 * Content templates and blueprints are v1-only with no v2 equivalent.
 *
 * Every template is created inside a disposable fixture space, so nothing here
 * touches the site's global templates.
 */

const tracker = new ResourceTracker();

let client: V1Client;
let spaceKey: string;

/** A minimal storage-format template body. */
function templateBody(html: string) {
  return { storage: { value: html, representation: 'storage' as const } };
}

beforeAll(async () => {
  client = getV1Client();
  spaceKey = (await createTestSpace(tracker, 'template')).key;
}, 100_000);

afterAll(async () => {
  await tracker.cleanup();
}, 100_000);

describe('Confluence Cloud v1 — template listings (live)', () => {
  it('returns a typed page of blueprint templates for the fixture space', async () => {
    const templates = await client.template.getBlueprintTemplates({ spaceKey });

    expect(Array.isArray(templates.results)).toBe(true);

    for (const template of templates.results) {
      expect(template).toMatchObject({ templateId: expect.any(String), name: expect.any(String) });
    }
  });

  it('honors `limit` on blueprint templates', async () => {
    const templates = await client.template.getBlueprintTemplates({ spaceKey, limit: 1 });

    expect(templates.results.length).toBeLessThanOrEqual(1);
  });

  it('returns a typed page of content templates for the fixture space', async () => {
    const templates = await client.template.getContentTemplates({ spaceKey });

    expect(Array.isArray(templates.results)).toBe(true);
  });

  it('rejects an unknown space key with an ApiError', async () => {
    const error = await client.template.getContentTemplates({ spaceKey: 'CFJSNOSUCHSPACE' }).catch(e => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — content template lifecycle (live, full round-trip)', () => {
  let templateId: string;

  it('creates a template in the fixture space', async () => {
    const created = await client.template.createContentTemplate({
      name: testName('template'),
      templateType: 'page',
      body: templateBody('<p>cfjs template body</p>'),
      description: 'created by the confluence.js live suite',
      space: { key: spaceKey },
    });

    expect(created.templateId).toBeTruthy();
    expect(created.templateType).toBe('page');

    templateId = created.templateId!;

    tracker.defer(async () => {
      await client.template.removeTemplate({ contentTemplateId: templateId }).catch(() => undefined);
    });
  });

  it('reads the template back by id, with its body when expanded', async () => {
    const template = await client.template.getContentTemplate({
      contentTemplateId: templateId,
      expand: ['body'],
    });

    expect(template.templateId).toBe(templateId);
    expect(template.body?.storage?.value).toContain('cfjs template body');
  });

  it('surfaces the template in the space listing', async () => {
    const templates = await client.template.getContentTemplates({ spaceKey });
    const ids = templates.results.map(template => template.templateId);

    expect(ids).toContain(templateId);
  });

  it('updates the template, and the read-back matches what was written', async () => {
    const renamed = testName('template-updated');

    const updated = await client.template.updateContentTemplate({
      templateId,
      name: renamed,
      templateType: 'page',
      body: templateBody('<p>cfjs template updated</p>'),
      space: { key: spaceKey },
    });

    expect(updated.name).toBe(renamed);

    const read = await client.template.getContentTemplate({ contentTemplateId: templateId, expand: ['body'] });

    expect(read.name).toBe(renamed);
    expect(read.body?.storage?.value).toContain('cfjs template updated');
  });

  it('removes the template, and reading it back fails with an ApiError', async () => {
    await client.template.removeTemplate({ contentTemplateId: templateId });

    const error = await client.template.getContentTemplate({ contentTemplateId: templateId }).catch(e => e);

    expect(error).toBeInstanceOf(ApiError);
  });

  it('rejects an unknown template id with an ApiError', async () => {
    const error = await client.template.getContentTemplate({ contentTemplateId: '0' }).catch(e => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});
