import { afterAll, beforeAll, describe, expect, expectTypeOf, it, vi } from 'vitest';
import type { ContentMetadata, ContentMetadataSchema as MetadataSchema } from '#/v1/models/contentMetadata';
import type { SpaceSettings, SpaceSettingsSchema as SettingsSchema } from '#/v1/models/spaceSettings';

let contentMetadataSchema: typeof MetadataSchema;
let spaceSettingsSchema: typeof SettingsSchema;

beforeAll(async () => {
  vi.stubEnv('AUDIT_SCHEMAS', 'true');
  vi.resetModules();
  ({ ContentMetadataSchema: contentMetadataSchema } = await import('#/v1/models/contentMetadata'));
  ({ SpaceSettingsSchema: spaceSettingsSchema } = await import('#/v1/models/spaceSettings'));
});

afterAll(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe('v1 space settings schema drift', () => {
  const settings = { routeOverrideEnabled: false, _links: {} };

  it.each([true, false])('recognizes the PDF export styling preference %s during strict audit', value => {
    const response = { ...settings, isPdfExportNoCodeStylingOptedIn: value };

    expect(spaceSettingsSchema.parse(response)).toEqual(response);
    expectTypeOf<SpaceSettings['isPdfExportNoCodeStylingOptedIn']>().toEqualTypeOf<boolean | undefined>();
  });

  it('keeps the preference optional', () => {
    expect(spaceSettingsSchema.parse(settings)).toEqual(settings);
  });

  it.each([null, 'false', 0, {}, []])('rejects an invalid preference %j', value => {
    expect(spaceSettingsSchema.safeParse({ ...settings, isPdfExportNoCodeStylingOptedIn: value }).success).toBe(false);
  });
});

describe('v1 content metadata schema drift', () => {
  it.each(['', 'Résumé — Привет 世界'])('recognizes attachment comment %j during strict audit', comment => {
    expect(contentMetadataSchema.parse({ comment })).toEqual({ comment });
    expectTypeOf<ContentMetadata['comment']>().toEqualTypeOf<string | undefined>();
  });

  it('keeps the comment optional for other content', () => {
    expect(contentMetadataSchema.parse({})).toEqual({});
  });

  it.each([null, false, 42, {}, []])('rejects an invalid comment %j', comment => {
    expect(contentMetadataSchema.safeParse({ comment }).success).toBe(false);
  });
});
