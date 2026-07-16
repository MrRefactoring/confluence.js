import { z } from 'zod';
import { apiObject } from '#/core';
import { ChildPageSchema } from './childPage';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const ChildPagesSchema = apiObject({
  results: z.array(ChildPageSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type ChildPages = z.infer<typeof ChildPagesSchema>;
