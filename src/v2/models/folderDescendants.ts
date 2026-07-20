import { z } from 'zod';
import { apiObject } from '#/core';
import { DescendantsSchema } from './descendants';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const FolderDescendantsSchema = apiObject({
  results: z.array(DescendantsSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type FolderDescendants = z.infer<typeof FolderDescendantsSchema>;
