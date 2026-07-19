import { z } from 'zod';

export const GetWhiteboardAncestorsSchema = z.object({
  /** The ID of the whiteboard. */
  id: z.number(),
  /**
   * Maximum number of items per result to return. If more results exist, call the endpoint with the highest
   * ancestor's ID to fetch the next set of results.
   */
  limit: z.number().optional(),
});

export type GetWhiteboardAncestors = z.input<typeof GetWhiteboardAncestorsSchema>;
