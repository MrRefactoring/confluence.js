import { z } from 'zod';
import { apiObject } from '#/core';
import { GroupSchema } from './group';

export const GroupArraySchema = apiObject({
  results: z.array(GroupSchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
});

export type GroupArray = z.infer<typeof GroupArraySchema>;
