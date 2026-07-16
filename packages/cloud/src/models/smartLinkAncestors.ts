import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { AncestorSchema } from './ancestor.js';

export const SmartLinkAncestorsSchema = apiObject({
  results: z.array(AncestorSchema).optional(),
});

export type SmartLinkAncestors = z.infer<typeof SmartLinkAncestorsSchema>;
