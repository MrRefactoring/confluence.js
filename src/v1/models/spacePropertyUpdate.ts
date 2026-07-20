import { z } from 'zod';
import { apiObject } from '#/core';
import { VersionSchema } from './version';

export const SpacePropertyUpdateSchema = apiObject({
  key: z.string().optional(),
  value: z.union([z.array(z.string()), z.boolean(), z.record(z.string(), z.any()), z.string()]),
  version: VersionSchema,
  space: apiObject({
    /** The key of the space */
    key: z.string().optional(),
  }).optional(),
});

export type SpacePropertyUpdate = z.infer<typeof SpacePropertyUpdateSchema>;
