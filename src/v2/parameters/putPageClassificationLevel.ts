import { z } from 'zod';

export const PutPageClassificationLevelSchema = z.object({
  /** The ID of the page for which classification level should be updated. */
  id: z.number(),
  body: z.record(z.string(), z.any()).optional(),
});

export type PutPageClassificationLevel = z.input<typeof PutPageClassificationLevelSchema>;
