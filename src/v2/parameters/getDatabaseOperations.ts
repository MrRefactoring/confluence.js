import { z } from 'zod';

export const GetDatabaseOperationsSchema = z.object({
  /** The ID of the database for which operations should be returned. */
  id: z.number(),
});

export type GetDatabaseOperations = z.input<typeof GetDatabaseOperationsSchema>;
