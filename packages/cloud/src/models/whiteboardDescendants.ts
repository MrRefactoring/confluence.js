import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { DescendantsSchema } from './descendants.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const WhiteboardDescendantsSchema = apiObject({
  results: z.array(DescendantsSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type WhiteboardDescendants = z.infer<typeof WhiteboardDescendantsSchema>;
