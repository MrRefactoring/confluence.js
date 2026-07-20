import { z } from 'zod';
import { apiObject } from '#/core';
import { SpaceSchema } from './space';
import { GenericLinksSchema } from './genericLinks';

export const SpaceArraySchema = apiObject({
  results: z.array(SpaceSchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
  _links: GenericLinksSchema,
});

export type SpaceArray = z.infer<typeof SpaceArraySchema>;
