import { z } from 'zod';
import { apiObject } from '#/core';
import { WatchSchema } from './watch';
import { GenericLinksSchema } from './genericLinks';

export const WatchArraySchema = apiObject({
  results: z.array(WatchSchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
  _links: GenericLinksSchema,
});

export type WatchArray = z.infer<typeof WatchArraySchema>;
