import { z } from 'zod';

export const GetPageAncestorsSchema = z.object({
  /** The ID of the page. */
  id: z.number(),
  /**
   * Maximum number of pages per result to return. If more results exist, call this endpoint with the highest ancestor's
   * ID to fetch the next set of results.
   */
  limit: z.number().optional(),
});

export type GetPageAncestors = z.input<typeof GetPageAncestorsSchema>;
