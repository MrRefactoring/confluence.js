import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { AncestorSchema } from './ancestor.js';

export const WhiteboardAncestorsSchema = apiObject({
  results: z.array(AncestorSchema).optional(),
});

export type WhiteboardAncestors = z.infer<typeof WhiteboardAncestorsSchema>;
