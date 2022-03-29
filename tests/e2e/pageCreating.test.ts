import { ConfluenceClient } from '../../src';
import test from 'ava';

const HOST = process.env.HOST!;
const EMAIL = process.env.EMAIL!;
const API_TOKEN = process.env.API_TOKEN!;

let createdContentId: string;
const client = new ConfluenceClient({
  host: HOST,
  telemetry: false,
  authentication: {
    basic: {
      email: EMAIL,
      apiToken: API_TOKEN,
    },
  },
});

test.serial('should create space', async (t) => {
  const space = await client.space.createSpace({
    name: 'Auto testing software',
    key: 'AUTOMATED',
  });

  t.truthy(!!space);
  t.is(space.key, 'AUTOMATED');
  t.is(space.name, 'Auto testing software');
});

test.serial('should create content', async (t) => {
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

  t.truthy(!!content);
  t.is(content.type, 'page');
  t.is(content.space?.key, 'AUTOMATED');
});

test.serial('should remove content', async (t) => {
  await client.content.deleteContent({
    id: createdContentId,
  });

  t.pass();
});

test.serial('should remove space', async (t) => {
  const removedSpace = await client.space.deleteSpace({
    spaceKey: 'AUTOMATED',
  });

  t.truthy(!!removedSpace);
});
