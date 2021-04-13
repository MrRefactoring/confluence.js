import { ConfluenceClient } from '../../src';

const HOST = process.env.HOST!;
const EMAIL = process.env.EMAIL!;
const API_TOKEN = process.env.API_TOKEN!;

describe('Page creating', () => {
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

  it('should create space', async () => {
    const space = await client.space.createSpace({
      name: 'Auto testing software',
      key: 'AUTOMATED',
    });

    expect(space).toBeDefined();
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

    expect(content).toBeDefined();
    expect(content.type).toBe('page');
    expect(content.space?.key).toBe('AUTOMATED');
  });

  it('should remove content', async () => {
    await client.content.deleteContent({
      id: createdContentId,
    });

    expect(true).toBeTruthy();
  });

  it('should remove space', async () => {
    const removedSpace = await client.space.deleteSpace({
      spaceKey: 'AUTOMATED',
    });

    expect(removedSpace).toBeDefined();
  });
});
