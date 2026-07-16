import { z } from 'zod';

export const GetSpaceLabelsSchema = z.object({
  /** The ID of the space for which labels should be returned. */
  id: z.number(),
  /** Filter the results to labels based on their prefix. */
  prefix: z.enum(['my', 'team']).optional(),
  /** Used to sort the result by a particular field. */
  sort: z.string().optional(),
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor: z.string().optional(),
  /**
   * Maximum number of labels per result to return. If more results exist, use the `Link` header to retrieve a
   * relative URL that will return the next set of results.
   */
  limit: z.number().optional(),
});

export type GetSpaceLabels = z.input<typeof GetSpaceLabelsSchema>;
