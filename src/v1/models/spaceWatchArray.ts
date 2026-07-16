import { z } from 'zod';
import { apiObject } from '#/core';
import { SpaceWatchSchema } from './spaceWatch';
import { GenericLinksSchema } from './genericLinks';

export const SpaceWatchArraySchema = apiObject({
  results: z.array(SpaceWatchSchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
  _links: GenericLinksSchema.optional(),
});

export type SpaceWatchArray = z.infer<typeof SpaceWatchArraySchema>;
