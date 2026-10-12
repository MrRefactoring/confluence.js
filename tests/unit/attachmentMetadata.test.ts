import { describe, expect, it, vi } from 'vitest';
import { createClient, type AttachmentInput, type Client } from '#/core';
import { createAttachment, createOrUpdateAttachments, updateAttachmentData } from '#/v1';

type Attachment = AttachmentInput & { comment?: string; minorEdit?: boolean };

const operations: [string, (client: Client, attachments: Attachment[]) => Promise<unknown>][] = [
  ['createAttachment', (client, attachments) => createAttachment(client, { id: '123', attachments })],
  ['createOrUpdateAttachments', (client, attachments) => createOrUpdateAttachments(client, { id: '123', attachments })],
  [
    'updateAttachmentData',
    (client, attachment) => updateAttachmentData(client, { id: '123', attachmentId: 'att123', attachment }),
  ],
];

async function upload(operation: (typeof operations)[number][1], attachments: Attachment[]): Promise<FormData> {
  const fetch = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
  const client = createClient({ host: 'https://acme.atlassian.net', fetch });

  await operation(client, attachments);

  const body = fetch.mock.calls[0][1].body;

  expect(body).toBeInstanceOf(FormData);
  expect(fetch.mock.calls[0][1].headers['Content-Type']).toBeUndefined();

  return body;
}

describe.each(operations)('%s attachment metadata', (_name, operation) => {
  it('omits metadata when every file leaves it unspecified', async () => {
    const body = await upload(operation, [
      { filename: 'a.txt', content: 'first' },
      { filename: 'b.txt', content: 'second' },
    ]);

    expect(body.getAll('file')).toHaveLength(2);
    expect(body.has('comment')).toBe(false);
    expect(body.has('minorEdit')).toBe(false);
  });

  it('keeps metadata aligned with files, including defaults, false, empty strings and UTF-8', async () => {
    const comment = 'Résumé — Привет 世界';
    const body = await upload(operation, [
      { filename: 'a.txt', content: 'first' },
      { filename: 'b.txt', content: 'second', comment, minorEdit: true },
      { filename: 'c.txt', content: 'third', comment: '', minorEdit: false },
    ]);
    const files = body.getAll('file') as File[];

    expect(files.map(file => file.name)).toEqual(['a.txt', 'b.txt', 'c.txt']);
    expect(await Promise.all(files.map(file => file.text()))).toEqual(['first', 'second', 'third']);
    expect(body.getAll('comment')).toEqual(['', comment, '']);
    expect(body.getAll('minorEdit')).toEqual(['false', 'true', 'false']);
    expect(await new Request('https://example.test', { method: 'POST', body }).text()).toContain(comment);
  });

  it('sends comment independently of minorEdit', async () => {
    const body = await upload(operation, [
      { filename: 'a.txt', content: 'first', comment: 'first version' },
      { filename: 'b.txt', content: 'second' },
    ]);

    expect(body.getAll('comment')).toEqual(['first version', '']);
    expect(body.has('minorEdit')).toBe(false);
  });

  it('sends an explicit false independently of comment', async () => {
    const body = await upload(operation, [
      { filename: 'a.txt', content: 'first' },
      { filename: 'b.txt', content: 'second', minorEdit: false },
    ]);

    expect(body.getAll('minorEdit')).toEqual(['false', 'false']);
    expect(body.has('comment')).toBe(false);
  });
});
