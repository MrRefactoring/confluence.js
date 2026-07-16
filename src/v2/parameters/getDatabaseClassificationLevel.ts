import { z } from 'zod';

export const GetDatabaseClassificationLevelSchema = z.object({
  /** The ID of the database for which classification level should be returned. */
  id: z.number(),
});

export type GetDatabaseClassificationLevel = z.input<typeof GetDatabaseClassificationLevelSchema>;
