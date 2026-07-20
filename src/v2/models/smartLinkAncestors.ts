import { z } from 'zod';
import { apiObject } from '#/core';
import { AncestorSchema } from './ancestor';

export const SmartLinkAncestorsSchema = apiObject({
  results: z.array(AncestorSchema).optional(),
});

export type SmartLinkAncestors = z.infer<typeof SmartLinkAncestorsSchema>;
