import { z } from 'zod';
import { apiObject } from '#/core';
import { RedactionPointerResponseSchema } from './redactionPointerResponse';

export const RedactionSectionSchema = apiObject({
  /** List of redactions that were applied to this section */
  redactions: z.array(RedactionPointerResponseSchema).optional(),
});

export type RedactionSection = z.infer<typeof RedactionSectionSchema>;
