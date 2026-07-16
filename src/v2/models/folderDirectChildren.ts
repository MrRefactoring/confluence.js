import { z } from 'zod';
import { apiObject } from '#/core';
import { ChildrenSchema } from './children';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const FolderDirectChildrenSchema = apiObject({
  results: z.array(ChildrenSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type FolderDirectChildren = z.infer<typeof FolderDirectChildrenSchema>;
