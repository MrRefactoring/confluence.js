import type { z } from 'zod';
import { apiObject } from '#/core';
import { RedactionSectionSchema } from './redactionSection';
/**
 * Response containing details of all redactions that were applied to the content.* Each redaction includes a unique ID
 * for restoration, except that code block redactions cannot be restored.*
 */

export const RedactionResponseSchema = apiObject({
  body: RedactionSectionSchema.optional(),
  title: RedactionSectionSchema.optional(),
});

export type RedactionResponse = z.infer<typeof RedactionResponseSchema>;
