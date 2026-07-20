import { z } from 'zod';
import { apiObject } from '#/core';
import { AncestorSchema } from './ancestor';

export const FolderAncestorsSchema = apiObject({
  results: z.array(AncestorSchema).optional(),
});

export type FolderAncestors = z.infer<typeof FolderAncestorsSchema>;
