import { z } from 'zod';
import { apiObject } from '#/core';
import { VersionSchema, type Version, type VersionInput } from './version';
import { GenericLinksSchema } from './genericLinks';

export const VersionArraySchema = apiObject({
  results: z.array(VersionSchema as z.ZodType<Version, VersionInput>),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
  _links: GenericLinksSchema,
});

export type VersionArray = z.infer<typeof VersionArraySchema>;
