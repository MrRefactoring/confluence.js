import { z } from 'zod';

export const GetPageDescendantsSchema = z.object({
  /** The ID of the page. */
  id: z.number(),
  /**
   * Maximum number of items per result to return. If more results exist, call the endpoint with the cursor to fetch
   * the next set of results.
   */
  limit: z.number().optional(),
  /**
   * Maximum depth of descendants to return. If more results are required, use the endpoint corresponding to the
   * content type of the deepest descendant to fetch more descendants.
   */
  depth: z.number().optional(),
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor: z.string().optional(),
});

export type GetPageDescendants = z.input<typeof GetPageDescendantsSchema>;
