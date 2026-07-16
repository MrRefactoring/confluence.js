import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { RedactionPointerResponseSchema } from '#/models/redactionPointerResponse';

export const RedactionSectionSchema = apiObject({
  /** List of redactions that were applied to this section */
  redactions: z.array(RedactionPointerResponseSchema).nullish(),
});

export type RedactionSection = z.infer<typeof RedactionSectionSchema>;
