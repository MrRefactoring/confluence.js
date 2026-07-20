import { z } from 'zod';
import { apiObject } from '#/core';
import { AncestorSchema } from './ancestor';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const PageAncestorsSchema = apiObject({
  results: z.array(AncestorSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type PageAncestors = z.infer<typeof PageAncestorsSchema>;
