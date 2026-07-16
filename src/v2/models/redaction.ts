import { z } from 'zod';
import { apiObject } from '#/core';
import { RedactionPointerSchema } from './redactionPointer';

export const RedactionSchema = apiObject({
  /** List of specific text ranges to redact within this section */
  redactions: z.array(RedactionPointerSchema).nullish(),
});

export type Redaction = z.infer<typeof RedactionSchema>;
