import { z } from 'zod';
import { apiObject } from '#/core';
import { AncestorSchema } from './ancestor';

export const DatabaseAncestorsSchema = apiObject({
  results: z.array(AncestorSchema).optional(),
});

export type DatabaseAncestors = z.infer<typeof DatabaseAncestorsSchema>;
