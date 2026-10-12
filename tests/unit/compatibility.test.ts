import { describe, expect, it, vi } from 'vitest';
import { createClient } from '#/core';
import { createV1Client, createV2Client } from '#/index';

describe('3.2 request compatibility', () => {
  it('sends every requested expansion as one comma-separated parameter', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    const client = createV1Client(createClient({ host: 'https://acme.atlassian.net', fetch }));

    await client.relation.getRelationship({
      relationName: 'favourite',
      sourceType: 'user',
      sourceKey: 'current-user',
      targetType: 'content',
      targetKey: '123',
      expand: ['source', 'target'],
    });

    expect(new URL(fetch.mock.calls[0][0]).searchParams.getAll('expand')).toEqual(['source,target']);
  });


  it('sends the existing v2 body wrapper without flattening or nesting it', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    const client = createV2Client(createClient({ host: 'https://acme.atlassian.net', fetch }));
    const body = {
      spaceId: '123',
      title: 'Compatibility',
      body: { representation: 'storage', value: '<p>Existing input</p>' },
    };

    await client.page.createPage({ body, private: true });

    const [url, init] = fetch.mock.calls[0];

    expect(url).toBe('https://acme.atlassian.net/wiki/api/v2/pages?private=true');
    expect(JSON.parse(init.body)).toEqual(body);
  });

  it('preserves shared request bodies for v1 dynamic modules', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    const client = createV1Client(createClient({ host: 'https://acme.atlassian.net', fetch }));
    const body = { modules: [{ key: 'existing-module' }] };

    await client.dynamicModules.registerModules({ body });

    expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual(body);
  });
});
