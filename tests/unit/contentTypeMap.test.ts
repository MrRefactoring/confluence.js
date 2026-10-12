import { describe, expect, it } from 'vitest';
import { ContentIdToContentTypeSchema } from '#/v2/models';

describe('content type mapping responses', () => {
  it('accepts null for missing IDs alongside built-in and custom content types', () => {
    const response = { results: { '123': 'page', '456': 'acme.custom-content', '789': null } };

    expect(ContentIdToContentTypeSchema.parse(response)).toEqual(response);
  });

  it.each([42, false, {}, []])('rejects non-string, non-null content types: %j', value => {
    expect(ContentIdToContentTypeSchema.safeParse({ results: { '123': value } }).success).toBe(false);
  });
});
