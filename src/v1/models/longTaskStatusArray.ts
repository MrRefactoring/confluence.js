import { z } from 'zod';
import { apiObject } from '#/core';
import { LongTaskStatusSchema } from './longTaskStatus';
import { GenericLinksSchema } from './genericLinks';

export const LongTaskStatusArraySchema = apiObject({
  results: z.array(LongTaskStatusSchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
  _links: GenericLinksSchema,
});

export type LongTaskStatusArray = z.infer<typeof LongTaskStatusArraySchema>;
