import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestPage, createTestSpace } from '../setup/fixtures';

/**
 * Labels are one of the few places both APIs are useful at once: v2 reads them
 * (`label.getPageLabels`), v1 writes them. Everything here is scoped to a
 * disposable fixture page.
 */

const tracker = new ResourceTracker();

let client: V1Client;
let pageId: string;

beforeAll(async () => {
  client = getV1Client();

  const space = await createTestSpace(tracker, 'labels');
  const page = await createTestPage(tracker, space.id);

  pageId = String(page.id);
}, 100_000);

afterAll(async () => {
  await tracker.cleanup();
}, 100_000);

describe('Confluence Cloud v1 — contentLabels.addLabelsToContent (live)', () => {
  it('adds a label and returns it in the typed result', async () => {
    const labels = await client.contentLabels.addLabelsToContent({
      id: pageId,
      body: [{ prefix: 'global', name: 'cfjs-added' }],
    });

    expect(Array.isArray(labels.results)).toBe(true);
    expect(labels.results.map(label => label.name)).toContain('cfjs-added');

    for (const label of labels.results) {
      expect(label).toMatchObject({ name: expect.any(String), prefix: expect.any(String) });
    }
  });

  it('adds several labels in one call', async () => {
    const labels = await client.contentLabels.addLabelsToContent({
      id: pageId,
      body: [
        { prefix: 'global', name: 'cfjs-one' },
        { prefix: 'global', name: 'cfjs-two' },
      ],
    });

    const names = labels.results.map(label => label.name);

    expect(names).toContain('cfjs-one');
    expect(names).toContain('cfjs-two');
  });

  it('is idempotent — adding the same label twice does not duplicate it', async () => {
    await client.contentLabels.addLabelsToContent({ id: pageId, body: [{ prefix: 'global', name: 'cfjs-dup' }] });

    const labels = await client.contentLabels.addLabelsToContent({
      id: pageId,
      body: [{ prefix: 'global', name: 'cfjs-dup' }],
    });

    expect(labels.results.filter(label => label.name === 'cfjs-dup')).toHaveLength(1);
  });

  it('rejects an unknown content id with an ApiError', async () => {
    const error = await client.contentLabels
      .addLabelsToContent({ id: '0', body: [{ prefix: 'global', name: 'cfjs-nope' }] })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — contentLabels.removeLabelFromContent (live)', () => {
  it('removes a label the page carries, and the removal sticks', async () => {
    await client.contentLabels.addLabelsToContent({ id: pageId, body: [{ prefix: 'global', name: 'cfjs-remove-me' }] });

    await client.contentLabels.removeLabelFromContent({ id: pageId, label: 'cfjs-remove-me' });

    const after = await client.contentLabels.addLabelsToContent({
      id: pageId,
      body: [{ prefix: 'global', name: 'cfjs-probe' }],
    });

    expect(after.results.map(label => label.name)).not.toContain('cfjs-remove-me');
  });

  it('removes a label via the query-parameter form', async () => {
    await client.contentLabels.addLabelsToContent({ id: pageId, body: [{ prefix: 'global', name: 'cfjs-qp' }] });

    await client.contentLabels.removeLabelFromContentUsingQueryParameter({ id: pageId, name: 'cfjs-qp' });

    const after = await client.contentLabels.addLabelsToContent({
      id: pageId,
      body: [{ prefix: 'global', name: 'cfjs-probe2' }],
    });

    expect(after.results.map(label => label.name)).not.toContain('cfjs-qp');
  });
});

describe('Confluence Cloud v1 — labelInfo.getAllLabelContent (live)', () => {
  it('returns typed label details for a label in use', async () => {
    await client.contentLabels.addLabelsToContent({ id: pageId, body: [{ prefix: 'global', name: 'cfjs-lookup' }] });

    const details = await client.labelInfo.getAllLabelContent({ name: 'cfjs-lookup' });

    expect(details.label).toMatchObject({ name: 'cfjs-lookup' });
    // `associatedContents` is a page object, not a bare array.
    expect(Array.isArray(details.associatedContents?.results)).toBe(true);
  });

  it('associates the label with the page that carries it', async () => {
    await client.contentLabels.addLabelsToContent({ id: pageId, body: [{ prefix: 'global', name: 'cfjs-assoc' }] });

    const details = await client.labelInfo.getAllLabelContent({ name: 'cfjs-assoc' });
    const ids = (details.associatedContents?.results ?? []).map(content => String(content.contentId));

    expect(ids).toContain(pageId);
  });

  it('honors `type` — filtering to pages never returns other content types', async () => {
    await client.contentLabels.addLabelsToContent({ id: pageId, body: [{ prefix: 'global', name: 'cfjs-typed' }] });

    const details = await client.labelInfo.getAllLabelContent({ name: 'cfjs-typed', type: 'page' });

    for (const content of details.associatedContents?.results ?? []) {
      expect(content.contentType).toBe('page');
    }
  });

  // A label only exists while something carries it: there is no empty-label state,
  // so an unused name is a 404 rather than details with an empty association page.
  it('rejects a label nobody uses with a 404 ApiError', async () => {
    const error = await client.labelInfo.getAllLabelContent({ name: 'cfjs-never-used-label' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(404);
  });
});
