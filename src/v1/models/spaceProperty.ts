import { z } from 'zod';
import { apiObject } from '#/core';
import { VersionSchema } from './version';
import { SpaceSchema } from './space';
import { GenericLinksSchema } from './genericLinks';

export const SpacePropertySchema = apiObject({
  id: z.string(),
  key: z.string(),
  value: z.union([z.array(z.string()), z.boolean(), z.record(z.string(), z.any()), z.string()]),
  version: VersionSchema.optional(),
  space: SpaceSchema.optional(),
  _links: GenericLinksSchema.optional(),
  _expandable: apiObject({
    version: z.string().optional(),
    space: z.string().optional(),
  }),
});

export type SpaceProperty = z.infer<typeof SpacePropertySchema>;
