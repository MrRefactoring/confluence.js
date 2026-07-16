import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { DescendantsSchema } from './descendants.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const DatabaseDescendantsSchema = apiObject({
  results: z.array(DescendantsSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type DatabaseDescendants = z.infer<typeof DatabaseDescendantsSchema>;
