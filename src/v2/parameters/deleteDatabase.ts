import { z } from 'zod';

export const DeleteDatabaseSchema = z.object({
  /** The ID of the database to be deleted. */
  id: z.number(),
});

export type DeleteDatabase = z.input<typeof DeleteDatabaseSchema>;
