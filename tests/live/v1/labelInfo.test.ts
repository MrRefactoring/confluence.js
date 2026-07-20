import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestPage, createTestSpace } from '../setup/fixtures';
import { runId } from '../helpers/naming';
import { waitFor } from '../helpers/poll';

/**
 * `getAllLabelContent` walks the other way round from `contentLabels`: content by
 * label, rather than labels by content. v1-only.
 *
 * A label has no independent existence — it lives only as long as something
 * carries it — so the fixture page has to be labelled before there is anything to
 * query, and the listing is eventually consistent behind that.
 */

const tracker = new ResourceTracker();

let client: V1Client;
let pageId: string;
let labelName: string;

beforeAll(async () => {
  client = getV1Client();

  const space = await createTestSpace(tracker, 'labelinfo');
  const page = await createTestPage(tracker, space.id);

  pageId = String(page.id);
  labelName = `cfjs-labelinfo-${runId()}`.toLowerCase();

  await client.contentLabels.addLabelsToContent({ id: pageId, body: [{ prefix: 'global', name: labelName }] });
}, 100_000);

afterAll(async () => {
  await tracker.cleanup();
}, 100_000);

describe('Confluence Cloud v1 — labelInfo.getAllLabelContent (live)', () => {
  it('finds the fixture page by the label it carries', async () => {
    const details = await waitFor(
      () => client.labelInfo.getAllLabelContent({ name: labelName }),
      value => (value.associatedContents?.results?.length ?? 0) > 0,
    );

    expect(details.label).toMatchObject({ name: labelName, prefix: 'global' });

    // Results are not content objects: each is `{ contentType, contentId, title }`,
    // with a numeric `contentId` and no `id`. Pinned because every other v1 listing
    // returns content with a string `id`, and this one quietly does not.
    const ids = details.associatedContents?.results?.map(content => String(content.contentId)) ?? [];

    expect(ids).toContain(pageId);

    for (const content of details.associatedContents?.results ?? []) {
      expect(content).toMatchObject({ contentType: 'page', title: expect.any(String) });
      expect(typeof content.contentId).toBe('number');
    }
  });

  it('honors `type` — filtering to blogpost excludes the labelled page', async () => {
    const details = await client.labelInfo.getAllLabelContent({ name: labelName, type: 'blogpost' });
    const ids = details.associatedContents?.results?.map(content => String(content.contentId)) ?? [];

    expect(ids).not.toContain(pageId);
  });

  it('honors `limit`', async () => {
    const details = await client.labelInfo.getAllLabelContent({ name: labelName, limit: 1 });

    expect(details.associatedContents?.results?.length ?? 0).toBeLessThanOrEqual(1);
  });

  // A label nothing carries does not exist, so this is not an empty result — the
  // API rejects the name outright. Same lesson as the watch suite learned.
  it('rejects a label no content carries with an ApiError', async () => {
    const error = await client.labelInfo.getAllLabelContent({ name: `cfjs-never-used-${runId()}` }).catch(e => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});
