import { z } from 'zod';

export const GetPageLikeUsersSchema = z.object({
  /** The ID of the page for which like count should be returned. */
  id: z.number(),
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor: z.string().optional(),
  /**
   * Maximum number of account IDs per result to return. If more results exist, use the `Link` header to retrieve a
   * relative URL that will return the next set of results.
   */
  limit: z.number().optional(),
});

export type GetPageLikeUsers = z.input<typeof GetPageLikeUsersSchema>;
