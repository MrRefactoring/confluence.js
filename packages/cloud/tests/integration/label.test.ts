import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '@confluence.js/core';
import type { createCloudV2Client } from '@confluence.js/cloud';
import { getLiveClient, v1Request } from './setup/client';
import { ResourceTracker } from './setup/resources';
import { createTestSpace, createTestPage, createTestBlogPost, type TestSpace } from './setup/fixtures';
import { runId } from './helpers/naming';
import { waitFor } from './helpers/poll';

/**
 * Live integration suite for the Confluence Cloud v2 `label` API
 * (`getLabels`, `getPageLabels`, `getBlogPostLabels`, `getAttachmentLabels`,
 * `getCustomContentLabels`, `getSpaceLabels`, `getSpaceContentLabels`).
 *
 * v2 exposes labels read-only — there is no create-label endpoint. So the suite
 * first *attaches* real labels to a freshly created page and blog post via the
 * v1 REST endpoint (`POST content/{id}/label`), then asserts the v2 read paths
 * return them with the exact shape the Zod models declare.
 *
 * What is verified:
 *   - `getPageLabels` (deep): added labels surface, every `Label` field is a
 *     populated string, the `prefix` query filter and `limit` have an observable
 *     effect, and a missing page id yields a typed 404 `ApiError`.
 *   - `getBlogPostLabels` (light): a label added to a blog post surfaces, typed.
 *   - `getLabels` (medium): the site-wide listing, filtered by the `label-id`
 *     derived from the label we created, returns that exact label.
 *   - `getSpaceLabels` / `getSpaceContentLabels` (shape): the fresh space yields a
 *     well-typed (possibly empty) result page.
 *   - `getAttachmentLabels` / `getCustomContentLabels` (gated-graceful): called
 *     with a plausible id, asserted to be either a typed empty page or a 404
 *     `ApiError` — we have no cheap attachment / custom-content parent here.
 *
 * Labels are eventually consistent: a just-attached label is not always in the
 * very next read, so `waitFor` polls the listing until they settle.
 *
 * Shared infra: `getLiveClient` (singleton v2 client), `v1Request` (auth'd v1
 * REST, for the add-label gap), `ResourceTracker` (LIFO retried teardown),
 * fixtures (`createTestSpace`/`createTestPage`/`createTestBlogPost`, self-cleaning).
 */

/** A label name Confluence accepts: lowercase alphanumeric, run-scoped & unique. */
function labelName(suffix: string): string {
  return `cfjs${runId()}${suffix}`.toLowerCase().replace(/[^a-z0-9]/g, '');
}

type LabelEntity = { id?: string; name?: string; prefix?: string };
type LabelPage = { results?: LabelEntity[]; _links?: { next?: string; base?: string } };

/** Every `Label` field is declared `z.string().optional()`; a real label populates all three. */
function expectWellFormedLabel(label: LabelEntity) {
  expect(typeof label.id).toBe('string');
  expect(label.id).toBeTruthy();
  // ids are numeric strings even though the model only says `string`.
  expect(label.id).toMatch(/^\d+$/);
  expect(typeof label.name).toBe('string');
  expect(label.name).toBeTruthy();
  expect(typeof label.prefix).toBe('string');
  expect(label.prefix).toBeTruthy();
}

/** A label listing is `{ results?: Label[], _links?: MultiEntityLinks }`. */
function expectWellFormedLabelPage(page: LabelPage) {
  expect(Array.isArray(page.results)).toBe(true)
  ;(page.results ?? []).forEach(expectWellFormedLabel);

  if (page._links !== undefined) {
    expect(typeof page._links).toBe('object');

    if (page._links.next !== undefined) expect(typeof page._links.next).toBe('string');

    if (page._links.base !== undefined) expect(typeof page._links.base).toBe('string');
  }
}

/** Attach a `global`-prefixed label to a piece of content via the v1 REST gap. */
async function addLabel(contentId: string, name: string): Promise<void> {
  await v1Request(`content/${contentId}/label`, {
    method: 'POST',
    body: [{ prefix: 'global', name }],
  });
}

let client: ReturnType<typeof createCloudV2Client>;
const tracker = new ResourceTracker();

let space: TestSpace;
let page: Awaited<ReturnType<typeof createTestPage>>;
let blog: Awaited<ReturnType<typeof createTestBlogPost>>;

const pageLabelA = labelName('pagea');
const pageLabelB = labelName('pageb');
const blogLabelName = labelName('blog');

/** The settled page-label listing captured after the labels become visible. */
let settledPageLabels: LabelEntity[] = [];

beforeAll(async () => {
  client = getLiveClient();

  space = await createTestSpace(tracker, 'label');
  page = await createTestPage(tracker, space.id);
  blog = await createTestBlogPost(tracker, space.id);

  await addLabel(page.id!, pageLabelA);
  await addLabel(page.id!, pageLabelB);
  await addLabel(blog.id!, blogLabelName);

  // Labels are eventually consistent — poll until both page labels appear.
  const settled = await waitFor<LabelPage>(
    () => client.label.getPageLabels({ id: Number(page.id) }),
    res => [pageLabelA, pageLabelB].every(n => (res.results ?? []).some(l => l.name === n)),
    { maxAttempts: 8 },
  );
  settledPageLabels = settled.results ?? [];
}, 60_000);

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — label.getPageLabels (live)', () => {
  it('returns the labels attached to the page, each fully typed', () => {
    expectWellFormedLabelPage({ results: settledPageLabels });

    const a = settledPageLabels.find(l => l.name === pageLabelA);
    const b = settledPageLabels.find(l => l.name === pageLabelB);
    expect(a, 'first added label must be present').toBeDefined();
    expect(b, 'second added label must be present').toBeDefined();
    // Added with `prefix: 'global'`, so that is the prefix that comes back.
    expect(a!.prefix).toBe('global');
    expect(b!.prefix).toBe('global');
  });

  it('filters by `prefix` — `global` includes our labels, `my` excludes them', async () => {
    const globalPage = await client.label.getPageLabels({ id: Number(page.id), prefix: 'global' });
    expectWellFormedLabelPage(globalPage);
    expect(globalPage.results!.every(l => l.prefix === 'global')).toBe(true);
    expect(globalPage.results!.some(l => l.name === pageLabelA)).toBe(true);
    expect(globalPage.results!.some(l => l.name === pageLabelB)).toBe(true);

    // Personal (`my`) labels are a different namespace — our global labels must not leak in.
    const myPage = await client.label.getPageLabels({ id: Number(page.id), prefix: 'my' });
    expectWellFormedLabelPage(myPage);
    expect(myPage.results!.some(l => l.name === pageLabelA || l.name === pageLabelB)).toBe(false);
  });

  it('honors `limit` — never returns more rows than requested', async () => {
    const limited = await client.label.getPageLabels({ id: Number(page.id), limit: 1 });

    expect(limited.results?.length ?? 0).toBeLessThanOrEqual(1);
    expectWellFormedLabelPage(limited);
  });

  it('rejects a non-existent page id with a 404 ApiError', async () => {
    let caught: unknown;

    try {
      await client.label.getPageLabels({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — label.getBlogPostLabels (live)', () => {
  it('returns the label attached to the blog post, fully typed', async () => {
    const settled = await waitFor<LabelPage>(
      () => client.label.getBlogPostLabels({ id: Number(blog.id) }),
      res => (res.results ?? []).some(l => l.name === blogLabelName),
      { maxAttempts: 8 },
    );

    expectWellFormedLabelPage(settled);
    const added = settled.results!.find(l => l.name === blogLabelName);
    expect(added, 'label added to the blog post must be present').toBeDefined();
    expect(added!.prefix).toBe('global');
  });

  it('rejects a non-existent blog post id with a 404 ApiError', async () => {
    let caught: unknown;

    try {
      await client.label.getBlogPostLabels({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — label.getLabels (live)', () => {
  it('returns a well-typed page of site-wide labels', async () => {
    const all = await client.label.getLabels({ limit: 25 });
    expectWellFormedLabelPage(all);
  });

  it('filters by `label-id` — returns exactly the label we created', async () => {
    const target = settledPageLabels.find(l => l.name === pageLabelA);
    expect(target, 'page label must have been captured in beforeAll').toBeDefined();
    expect(target!.id).toMatch(/^\d+$/);

    const filtered = await client.label.getLabels({ labelId: [Number(target!.id)] });

    expectWellFormedLabelPage(filtered);
    expect(filtered.results!.length).toBeGreaterThan(0);
    // The `label-id` filter is exact — every row is the one label we asked for.
    expect(filtered.results!.every(l => l.id === target!.id)).toBe(true);
    const match = filtered.results!.find(l => l.id === target!.id);
    expect(match!.name).toBe(pageLabelA);
  });
});

describe('Confluence Cloud v2 — label.getSpaceLabels (live)', () => {
  it('returns a well-typed (possibly empty) result page for the fresh space', async () => {
    const labels = await client.label.getSpaceLabels({ id: Number(space.id) });
    expectWellFormedLabelPage(labels);
  });

  it('rejects a non-existent space id with a 404 ApiError', async () => {
    let caught: unknown;

    try {
      await client.label.getSpaceLabels({ id: 999_999_999 });
    } catch (error) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).status).toBe(404);
  });
});

describe('Confluence Cloud v2 — label.getSpaceContentLabels (live)', () => {
  it('returns a well-typed result page for content within the space', async () => {
    const labels = await client.label.getSpaceContentLabels({ id: Number(space.id) });
    expectWellFormedLabelPage(labels);
  });
});

/**
 * Gated-graceful: no cheap attachment / custom-content parent is available in this
 * suite, so each method is still invoked (to exercise typing + URL serialization)
 * against a plausible-but-nonexistent id, and the outcome is asserted to be either
 * a typed empty page or a typed 404 `ApiError`.
 */
describe('Confluence Cloud v2 — label.getAttachmentLabels / getCustomContentLabels (live, gated)', () => {
  it('getAttachmentLabels yields a typed empty page or a 404 ApiError', async () => {
    try {
      const labels = await client.label.getAttachmentLabels({ id: 'att999999999' });
      expectWellFormedLabelPage(labels);
      expect(labels.results ?? []).toHaveLength(0);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect((error as ApiError).status).toBe(404);
    }
  });

  it('getCustomContentLabels yields a typed empty page or a 404 ApiError', async () => {
    try {
      const labels = await client.label.getCustomContentLabels({ id: 999_999_999 });
      expectWellFormedLabelPage(labels);
      expect(labels.results ?? []).toHaveLength(0);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect((error as ApiError).status).toBe(404);
    }
  });
});
