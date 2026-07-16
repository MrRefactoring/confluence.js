import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { ChildrenSchema } from './children.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const DatabaseDirectChildrenSchema = apiObject({
  results: z.array(ChildrenSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type DatabaseDirectChildren = z.infer<typeof DatabaseDirectChildrenSchema>;
