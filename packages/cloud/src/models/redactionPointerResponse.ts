import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const RedactionPointerResponseSchema = apiObject({
  /** JSON pointer indicating where the redaction was applied */
  pointer: z.string().optional(),
  /** Starting character index where redaction was applied */
  from: z.number().optional(),
  /** Ending character index where redaction was applied */
  to: z.number().optional(),
  /** Reason for the redaction */
  reason: z.string().optional(),
  /** Unique identifier for this redaction. Can be used to restore the redacted content later. */
  redactionId: z.string().optional(),
});

export type RedactionPointerResponse = z.infer<typeof RedactionPointerResponseSchema>;
