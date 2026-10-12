import { describe, expect, expectTypeOf, it } from 'vitest';
import { SpaceSchema, SpaceSummarySchema } from '#/v2/models';

describe.each([
  ['Space', SpaceSchema],
  ['SpaceSummary', SpaceSummarySchema],
] as const)('%s homepage metadata', (_name, schema) => {
  it('treats a null homepage ID as absent while retaining the legacy output type', () => {
    const response = schema.parse({ id: '123', homepageId: null });

    expect(response.id).toBe('123');
    expect(response.homepageId).toBeUndefined();
    expectTypeOf(response.homepageId).toEqualTypeOf<string | undefined>();
  });

  it('preserves an omitted homepage ID', () => {
    expect(schema.parse({ id: '123' })).toEqual({ id: '123' });
  });

  it('preserves an available homepage ID', () => {
    const response = { id: '123', homepageId: '456' };

    expect(schema.parse(response)).toEqual(response);
  });

  it.each([42, false, {}, []])('rejects invalid homepage IDs: %j', homepageId => {
    expect(schema.safeParse({ id: '123', homepageId }).success).toBe(false);
  });
});
