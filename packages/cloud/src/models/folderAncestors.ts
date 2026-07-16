import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { AncestorSchema } from './ancestor.js';

export const FolderAncestorsSchema = apiObject({
  results: z.array(AncestorSchema).optional(),
});

export type FolderAncestors = z.infer<typeof FolderAncestorsSchema>;
