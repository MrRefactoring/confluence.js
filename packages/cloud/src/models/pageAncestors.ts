import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { AncestorSchema } from './ancestor.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const PageAncestorsSchema = apiObject({
  results: z.array(AncestorSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type PageAncestors = z.infer<typeof PageAncestorsSchema>;
