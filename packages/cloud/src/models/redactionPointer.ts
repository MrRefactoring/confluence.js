import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const RedactionPointerSchema = apiObject({
  /**
   * JSON pointer indicating the exact location within the content structure where redaction should be applied. Points
   * to the text node containing the content to redact.
   */
  pointer: z.string(),
  /** Starting character index (zero-based) within the target text where redaction begins. */
  from: z.number().optional(),
  /**
   * Ending character index (zero-based) within the target text where redaction ends (exclusive). Must be greater than
   * or equal to 'from' value.
   */
  to: z.number().optional(),
  /** Optional human-readable reason for the redaction. Used for audit trails and compliance documentation. */
  reason: z.string().nullish(),
});

export type RedactionPointer = z.infer<typeof RedactionPointerSchema>;
