import { describe, expect, it, vi } from 'vitest';
import type FormData from 'form-data';
import { ContentAttachments } from '~/api';
import type { Client } from '~/clients';

describe('ContentAttachments', () => {
  const attachment = {
    file: Buffer.from('file content'),
    filename: 'file.txt',
    minorEdit: true,
    comment: 'изменения ✓',
  };

  const setup = () => {
    const sendRequest = vi.fn();
    const contentAttachments = new ContentAttachments({ sendRequest } as unknown as Client);
    const sentBody = () => (sendRequest.mock.calls[0][0].data as FormData).getBuffer().toString('utf8');

    return { contentAttachments, sentBody };
  };

  const expectPlainFields = (body: string) => {
    expect(body).toContain('Content-Disposition: form-data; name="minorEdit"\r\n\r\ntrue\r\n');
    expect(body).toContain('Content-Disposition: form-data; name="comment"\r\n\r\nизменения ✓\r\n');
    expect(body).toContain('Content-Disposition: form-data; name="file"; filename="file.txt"');
    expect(body).not.toContain('filename="minorEdit"');
    expect(body).not.toContain('filename="comment"');
  };

  it('createAttachments sends minorEdit and comment as plain form fields', async () => {
    const { contentAttachments, sentBody } = setup();

    await contentAttachments.createAttachments({ id: '1', attachments: attachment });

    expectPlainFields(sentBody());
  });

  it('createOrUpdateAttachments sends minorEdit and comment as plain form fields', async () => {
    const { contentAttachments, sentBody } = setup();

    await contentAttachments.createOrUpdateAttachments({ id: '1', attachments: attachment });

    expectPlainFields(sentBody());
  });

  it('updateAttachmentData sends minorEdit and comment as plain form fields', async () => {
    const { contentAttachments, sentBody } = setup();

    await contentAttachments.updateAttachmentData({ id: '1', attachmentId: '2', attachment });

    expectPlainFields(sentBody());
  });

  it('repeats the plain fields for every attachment', async () => {
    const { contentAttachments, sentBody } = setup();

    await contentAttachments.createAttachments({
      id: '1',
      attachments: [attachment, { ...attachment, filename: 'second.txt' }],
    });

    const body = sentBody();

    expect(body.match(/name="minorEdit"\r\n/g)).toHaveLength(2);
    expect(body.match(/name="comment"\r\n/g)).toHaveLength(2);
    expect(body).not.toContain('filename="minorEdit"');
    expect(body).not.toContain('filename="comment"');
  });
});
