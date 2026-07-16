import { z } from 'zod';

export const GetSmartLinkAncestorsSchema = z.object({
  /** The ID of the Smart Link in the content tree. */
  id: z.number(),
  /**
   * Maximum number of items per result to return. If more results exist, call the endpoint with the highest ancestor's
   * ID to fetch the next set of results.
   */
  limit: z.number().optional(),
});

export type GetSmartLinkAncestors = z.input<typeof GetSmartLinkAncestorsSchema>;
