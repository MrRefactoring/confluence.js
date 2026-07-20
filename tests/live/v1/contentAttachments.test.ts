import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestPage, createTestSpace } from '../setup/fixtures';
import { runId } from '../helpers/naming';

/**
 * Attachment upload is v1-only: v2 reads attachments but cannot create them.
 *
 * These are the only multipart endpoints in either spec, and they are the reason
 * `AttachmentInput` exists — the three upload operations take file content rather
 * than JSON. The suite deliberately uploads through the typed client rather than
 * a hand-rolled `fetch`, since that path is exactly what is worth proving.
 */

const tracker = new ResourceTracker();

let client: V1Client;
let pageId: string;

/** A small text attachment, named uniquely per run. */
function textAttachment(label: string, body: string) {
  return { filename: `cfjs-${label}-${runId()}.txt`, content: body };
}

beforeAll(async () => {
  client = getV1Client();

  const space = await createTestSpace(tracker, 'attach');
  const page = await createTestPage(tracker, space.id);

  pageId = String(page.id);
}, 100_000);

afterAll(async () => {
  await tracker.cleanup();
}, 100_000);

describe('Confluence Cloud v1 — contentAttachments.createAttachment (live, multipart)', () => {
  it('uploads a file and returns it as typed content', async () => {
    const attachment = textAttachment('create', 'cfjs attachment body');
    const created = await client.contentAttachments.createAttachment({ id: pageId, attachments: attachment });

    expect(Array.isArray(created.results)).toBe(true);
    expect(created.results).toHaveLength(1);

    const [uploaded] = created.results;

    expect(uploaded.title).toBe(attachment.filename);
    expect(uploaded.type).toBe('attachment');
  }, 60_000);

  it('uploads several files in one request', async () => {
    const attachments = [textAttachment('multi-a', 'first'), textAttachment('multi-b', 'second')];
    const created = await client.contentAttachments.createAttachment({ id: pageId, attachments });

    expect(created.results).toHaveLength(2);
    expect(created.results.map(result => result.title)).toEqual(attachments.map(a => a.filename));
  }, 60_000);

  it('accepts a Buffer as content, not just a string', async () => {
    const filename = `cfjs-buffer-${runId()}.bin`;
    const created = await client.contentAttachments.createAttachment({
      id: pageId,
      attachments: { filename, content: Buffer.from([1, 2, 3, 4]) },
    });

    expect(created.results[0].title).toBe(filename);
  }, 60_000);

  it('rejects an unknown content id with an ApiError', async () => {
    const error = await client.contentAttachments
      .createAttachment({ id: '0', attachments: textAttachment('nope', 'x') })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — contentAttachments.createOrUpdateAttachments (live, multipart)', () => {
  it('creates an attachment on first call and versions it on the second', async () => {
    const attachment = textAttachment('upsert', 'version one');

    const first = await client.contentAttachments.createOrUpdateAttachments({ id: pageId, attachments: attachment });

    expect(first.results[0].title).toBe(attachment.filename);

    const second = await client.contentAttachments.createOrUpdateAttachments({
      id: pageId,
      attachments: { ...attachment, content: 'version two' },
    });

    expect(second.results[0].title).toBe(attachment.filename);
    expect(second.results[0].id).toBe(first.results[0].id);
  }, 90_000);
});

describe('Confluence Cloud v1 — contentAttachments.updateAttachmentData (live, multipart)', () => {
  it('replaces the data of an existing attachment, bumping its version', async () => {
    const attachment = textAttachment('data', 'before');
    const created = await client.contentAttachments.createAttachment({ id: pageId, attachments: attachment });
    const attachmentId = created.results[0].id!;

    const updated = await client.contentAttachments.updateAttachmentData({
      id: pageId,
      attachmentId,
      attachment: { ...attachment, content: 'after' },
    });

    expect(updated.id).toBe(attachmentId);
    expect(updated.version?.number).toBeGreaterThan(1);
  }, 90_000);

  it('rejects an unknown attachment id with an ApiError', async () => {
    const error = await client.contentAttachments
      .updateAttachmentData({ id: pageId, attachmentId: 'att0', attachment: textAttachment('nope', 'x') })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — contentAttachments.updateAttachmentProperties (live)', () => {
  it('renames an attachment through its properties, and the read-back matches', async () => {
    const attachment = textAttachment('props', 'props body');
    const created = await client.contentAttachments.createAttachment({ id: pageId, attachments: attachment });
    const uploaded = created.results[0];
    const renamed = `cfjs-renamed-${runId()}.txt`;

    const updated = await client.contentAttachments.updateAttachmentProperties({
      id: pageId,
      attachmentId: uploaded.id!,
      body: {
        id: uploaded.id!,
        type: 'attachment',
        title: renamed,
        version: { number: (uploaded.version?.number ?? 1) + 1 },
      },
    });

    expect(updated.title).toBe(renamed);
  }, 90_000);
});

describe('Confluence Cloud v1 — contentAttachments.downloadAttatchment (live)', () => {
  // The name is Atlassian's typo, kept because it is the operationId — renaming it
  // in the client would hide the endpoint it maps to.
  //
  // The spec declares only a 302 for this and no success response, so it typed as
  // `unknown` and handed back nothing. It really answers with the file, behind a
  // redirect fetch follows on its own.
  it('downloads back exactly the bytes that were uploaded', async () => {
    const body = 'downloadable body';
    const attachment = textAttachment('download', body);
    const created = await client.contentAttachments.createAttachment({ id: pageId, attachments: attachment });

    const downloaded = await client.contentAttachments.downloadAttatchment({
      id: pageId,
      attachmentId: created.results[0].id!,
    });

    expect(Buffer.from(downloaded as Uint8Array).toString('utf8')).toBe(body);
  }, 60_000);

  it('rejects an unknown attachment id with an ApiError', async () => {
    const error = await client.contentAttachments
      .downloadAttatchment({ id: pageId, attachmentId: 'att0' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});
