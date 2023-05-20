import * as fs from 'fs';
import test from 'ava';
import { ConfluenceClient, Version2Client } from '../../src';

const HOST = process.env.HOST!;
const EMAIL = process.env.EMAIL!;
const API_TOKEN = process.env.API_TOKEN!;

let createdContentId: string;
let createdAttachmentId: string;

const config = {
  host: HOST,
  telemetry: false,
  newErrorHandling: true,
  authentication: {
    basic: {
      email: EMAIL,
      apiToken: API_TOKEN,
    },
  },
};

const client = new ConfluenceClient(config);
const version2Client = new Version2Client(config);

test.serial('should create space', async t => {
  const space = await client.space.createSpace({
    name: 'Auto testing software',
    key: 'AUTOMATED',
  });

  t.truthy(!!space);
  t.is(space.key, 'AUTOMATED');
  t.is(space.name, 'Auto testing software');
});

test.serial('should create content', async t => {
  const content = await version2Client.page.createPage({
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

  t.truthy(!!content);
  t.is(content.type, 'page');
  t.is(content.space?.key, 'AUTOMATED');
});

test.serial('should add attachment', async t => {
  const file = await fs.readFileSync('./tests/unit/clients/serverClient.test.ts');

  const attachment = await version2Client.contentAttachments.createAttachments({
    id: createdContentId,
    attachments: {
      file,
      filename: 'serverApiClient.test.ts',
      minorEdit: true,
      comment: 'heh comment',
      contentType: 'application/javascript',
    },
  });

  t.truthy(!!attachment);
  t.truthy(attachment.results.length === 1);
  t.is(attachment.results[0].title, 'serverApiClient.test.ts');
  t.is(attachment.results[0].metadata.mediaType, 'application/javascript');
  t.is(attachment.results[0].version.minorEdit, true);
});

test.serial('should get attachments', async t => {
  const attachments = await version2Client.contentAttachments.getAttachments({
    id: createdContentId,
  });

  t.truthy(!!attachments);
  t.truthy(attachments.results.length === 1);
  t.is(attachments.results[0].title, 'serverApiClient.test.ts');
  t.is(attachments.results[0].metadata.mediaType, 'application/javascript');
});

test.serial('should update attachment', async t => {
  const attachments = await version2Client.contentAttachments.createOrUpdateAttachments({
    id: createdContentId,
    attachments: {
      file: 'testFileContent',
      filename: 'serverApiClient.test.ts',
      minorEdit: false,
      comment: 'some changes',
      contentType: 'application/javascript',
    },
  });

  createdAttachmentId = attachments.results[0].id;

  t.truthy(!!attachments);
  t.truthy(attachments.results.length === 1);
  t.is(attachments.results[0].title, 'serverApiClient.test.ts');
  t.is(attachments.results[0].metadata.mediaType, 'application/javascript');
  t.is(attachments.results[0].version.minorEdit, false);
  t.is(attachments.results[0].version.number, 2);
  t.is(attachments.results[0].version.message, 'some changes');
});

test.serial('should update attachment properties', async t => {
  const attachment = await version2Client.contentAttachments.updateAttachmentProperties({
    id: createdContentId,
    attachmentId: createdAttachmentId,
    update: {
      id: createdAttachmentId,
      version: {
        number: 2,
      },
      title: 'serverApiClient.test.ts',
      type: 'attachment',
      status: 'current',
      metadata: {
        mediaType: 'text/plain',
      },
    },
  });

  t.truthy(!!attachment);
  t.is(attachment.title, 'serverApiClient.test.ts');
  t.is(attachment.metadata.mediaType, 'text/plain');
  t.is(attachment.version.minorEdit, false);
  t.is(attachment.version.number, 2);
  t.is(attachment.version.message, 'some changes');
});

test.serial('should update content attachment data', async t => {
  const attachment = await version2Client.contentAttachments.updateAttachmentData({
    id: createdContentId,
    attachmentId: createdAttachmentId,
    attachment: {
      file: 'testFileContent',
      filename: 'serverApiClient.test.ts',
      minorEdit: true,
    },
  });

  t.truthy(!!attachment);
  t.is(attachment.title, 'serverApiClient.test.ts');
  t.is(attachment.metadata.mediaType, 'video/mp2t');
  t.is(attachment.version.minorEdit, true);
  t.is(attachment.version.number, 3);
  t.is<string | undefined, undefined>(attachment.version.message, undefined);
});

test.serial('should download content attachment', async t => {
  const attachment = await version2Client.contentAttachments.downloadAttachment({
    id: createdContentId,
    attachmentId: createdAttachmentId,
  });

  t.truthy(!!attachment);
  t.is(attachment.toString(), 'testFileContent');
});

test.serial('should remove content', async t => {
  await version2Client.content.deleteContent({
    id: createdContentId,
  });

  t.pass();
});

test.serial('should remove space', async t => {
  const removedSpace = await version2Client.space.deleteSpace({
    spaceKey: 'AUTOMATED',
  });

  t.truthy(!!removedSpace);
});
