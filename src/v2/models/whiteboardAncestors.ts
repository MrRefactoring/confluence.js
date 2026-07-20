import { z } from 'zod';
import { apiObject } from '#/core';
import { AncestorSchema } from './ancestor';

export const WhiteboardAncestorsSchema = apiObject({
  results: z.array(AncestorSchema).optional(),
});

export type WhiteboardAncestors = z.infer<typeof WhiteboardAncestorsSchema>;
