import { z } from 'zod';

export const AsyncConvertContentBodyResponseSchema = z.object({
  /** The asyncId of the macro task to get the converted body. */
  id: z.string(),
});

export type AsyncConvertContentBodyResponse = z.input<typeof AsyncConvertContentBodyResponseSchema>;
