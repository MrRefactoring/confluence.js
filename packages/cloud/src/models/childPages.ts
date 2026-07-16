import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { ChildPageSchema } from './childPage.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const ChildPagesSchema = apiObject({
  results: z.array(ChildPageSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type ChildPages = z.infer<typeof ChildPagesSchema>;
