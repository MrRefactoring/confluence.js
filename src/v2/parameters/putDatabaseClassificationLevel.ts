import { z } from 'zod';

export const PutDatabaseClassificationLevelSchema = z.object({
  /** The ID of the database for which classification level should be updated. */
  id: z.number(),
  body: z.record(z.string(), z.any()).optional(),
});

export type PutDatabaseClassificationLevel = z.input<typeof PutDatabaseClassificationLevelSchema>;
