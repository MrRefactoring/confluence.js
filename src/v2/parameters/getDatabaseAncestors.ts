import { z } from 'zod';

export const GetDatabaseAncestorsSchema = z.object({
  /** The ID of the database. */
  id: z.number(),
  /**
   * Maximum number of items per result to return. If more results exist, call the endpoint with the highest
   * ancestor's ID to fetch the next set of results.
   */
  limit: z.number().optional(),
});

export type GetDatabaseAncestors = z.input<typeof GetDatabaseAncestorsSchema>;
