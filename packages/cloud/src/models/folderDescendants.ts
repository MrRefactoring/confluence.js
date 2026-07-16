import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { DescendantsSchema } from './descendants.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const FolderDescendantsSchema = apiObject({
  results: z.array(DescendantsSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type FolderDescendants = z.infer<typeof FolderDescendantsSchema>;
