import { z } from 'zod';
import { apiObject } from '#/core';
import { VersionSchema } from './version';
import { GenericLinksSchema } from './genericLinks';

export const VersionArraySchema = apiObject({
  results: z.array(VersionSchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
  _links: GenericLinksSchema,
});

export type VersionArray = z.infer<typeof VersionArraySchema>;
