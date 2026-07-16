import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { AncestorSchema } from './ancestor.js';

export const DatabaseAncestorsSchema = apiObject({
  results: z.array(AncestorSchema).optional(),
});

export type DatabaseAncestors = z.infer<typeof DatabaseAncestorsSchema>;
