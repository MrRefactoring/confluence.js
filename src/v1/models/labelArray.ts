import { z } from 'zod';
import { apiObject } from '#/core';
import { LabelSchema } from './label';
import { GenericLinksSchema } from './genericLinks';

export const LabelArraySchema = apiObject({
  results: z.array(LabelSchema),
  start: z.number().optional(),
  limit: z.number().optional(),
  size: z.number(),
  _links: GenericLinksSchema.optional(),
});

export type LabelArray = z.infer<typeof LabelArraySchema>;
