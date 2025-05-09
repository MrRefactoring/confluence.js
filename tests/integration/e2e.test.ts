import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import { ConfluenceClient } from '../../src';

const HOST = process.env.HOST!;
const EMAIL = process.env.EMAIL!;
const API_TOKEN = process.env.API_TOKEN!;

describe('ConfluenceClient E2E Tests', () => {
  let createdContentId: string;
  let createdAttachmentId: string;
  const client = new ConfluenceClient({
    host: HOST,
    authentication: {
      basic: {
        email: EMAIL,
        apiToken: API_TOKEN,
      },
    },
  });

  it('should create space', async () => {
    const space = await client.space.createSpace({
      name: 'Auto testing software',
      key: 'AUTOMATED',
    });

    expect(space).toBeTruthy();
    expect(space.key).toBe('AUTOMATED');
    expect(space.name).toBe('Auto testing software');
  });

  it('should create content', async () => {
    const content = await client.content.createContent({
      title: 'Test page',
      space: {
        key: 'AUTOMATED',
      },
      type: 'page',
      body: {
        view: {
          value: '<string>',
          representation: 'view',
        },
      },
    });

    createdContentId = content.id;

    expect(content).toBeTruthy();
    expect(content.type).toBe('page');
    expect(content.space?.key).toBe('AUTOMATED');
  });

  it('should add attachment', async () => {
    const file = fs.readFileSync('./tests/unit/index.test.ts');

    const attachment = await client.contentAttachments.createAttachments({
      id: createdContentId,
      attachments: {
        file,
        filename: 'space.test.ts',
        minorEdit: true,
        comment: 'heh comment',
        contentType: 'application/javascript',
      },
    });

    expect(attachment).toBeTruthy();
    expect(attachment.results.length).toBe(1);
    expect(attachment.results[0].title).toBe('space.test.ts');
    expect(attachment.results[0].metadata.mediaType).toBe('application/javascript');
    expect(attachment.results[0].version.minorEdit).toBe(true);
  });

  it('should get attachments', async () => {
    const attachments = await client.contentAttachments.getAttachments({
      id: createdContentId,
    });

    expect(attachments).toBeTruthy();
    expect(attachments.results.length).toBe(1);
    expect(attachments.results[0].title).toBe('space.test.ts');
    expect(attachments.results[0].metadata.mediaType).toBe('application/javascript');
  });

  it('should update attachment', async () => {
    const attachments = await client.contentAttachments.createOrUpdateAttachments({
      id: createdContentId,
      attachments: {
        file: 'testFileContent',
        filename: 'space.test.ts',
        minorEdit: false,
        comment: 'some changes',
        contentType: 'application/javascript',
      },
    });

    createdAttachmentId = attachments.results[0].id;

    expect(attachments).toBeTruthy();
    expect(attachments.results.length).toBe(1);
    expect(attachments.results[0].title).toBe('space.test.ts');
    expect(attachments.results[0].metadata.mediaType).toBe('application/javascript');
    expect(attachments.results[0].version.minorEdit).toBe(false);
    expect(attachments.results[0].version.number).toBe(2);
    expect(attachments.results[0].version.message).toBe('some changes');
  });

  it('should update attachment properties', async () => {
    const attachment = await client.contentAttachments.updateAttachmentProperties({
      id: createdContentId,
      attachmentId: createdAttachmentId,
      update: {
        id: createdAttachmentId,
        version: {
          number: 2,
        },
        title: 'space.test.ts',
        type: 'attachment',
        status: 'current',
        metadata: {
          mediaType: 'text/plain',
        },
      },
    });

    expect(attachment).toBeTruthy();
    expect(attachment.title).toBe('space.test.ts');
    expect(attachment.metadata.mediaType).toBe('text/plain');
    expect(attachment.version.minorEdit).toBe(false);
    expect(attachment.version.number).toBe(2);
    expect(attachment.version.message).toBe('some changes');
  });

  it('should update content attachment data', async () => {
    const attachment = await client.contentAttachments.updateAttachmentData({
      id: createdContentId,
      attachmentId: createdAttachmentId,
      attachment: {
        file: 'testFileContent',
        filename: 'space.test.ts',
        minorEdit: true,
      },
    });

    expect(attachment).toBeTruthy();
    expect(attachment.title).toBe('space.test.ts');
    expect(attachment.metadata.mediaType).toBe('video/mp2t');
    expect(attachment.version.minorEdit).toBe(true);
    expect(attachment.version.number).toBe(3);
    expect(attachment.version.message).toBeUndefined();
  });

  it('should download content attachment', async () => {
    const attachment = await client.contentAttachments.downloadAttachment({
      id: createdContentId,
      attachmentId: createdAttachmentId,
    });

    expect(attachment).toBeTruthy();
    expect(attachment.toString()).toBe('testFileContent');
  });

  it('should remove content', async () => {
    await expect(client.content.deleteContent({
      id: createdContentId,
    })).resolves.not.toThrow();
  });

  it('should remove space', async () => {
    const removedSpace = await client.space.deleteSpace({
      spaceKey: 'AUTOMATED',
    });
    expect(removedSpace).toBeTruthy();
  });
});
