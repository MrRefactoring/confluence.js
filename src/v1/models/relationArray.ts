import { z } from 'zod';
import { apiObject } from '#/core';
import { RelationSchema } from './relation';
import { GenericLinksSchema } from './genericLinks';

export const RelationArraySchema = apiObject({
  results: z.array(RelationSchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
  _links: GenericLinksSchema,
});

export type RelationArray = z.infer<typeof RelationArraySchema>;
