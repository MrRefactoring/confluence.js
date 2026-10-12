import { z } from 'zod';
import { apiObject } from '#/core';
import { VersionSchema, type Version, type VersionInput } from './version';
import { SpaceSchema, type Space, type SpaceInput } from './space';
import { GenericLinksSchema } from './genericLinks';

export const SpacePropertySchema = apiObject({
  id: z.string(),
  key: z.string(),
  value: z.union([z.array(z.string()), z.boolean(), z.record(z.string(), z.any()), z.string()]),
  version: (VersionSchema as z.ZodType<Version, VersionInput>).optional(),
  space: (SpaceSchema as z.ZodType<Space, SpaceInput>).optional(),
  _links: GenericLinksSchema.optional(),
  _expandable: apiObject({
    version: z.string().optional(),
    space: z.string().optional(),
  }),
});

export type SpaceProperty = z.infer<typeof SpacePropertySchema>;
