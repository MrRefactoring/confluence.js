import { z } from 'zod';

export const GetChildCustomContentSchema = z.object({
  /**
   * The ID of the parent custom content. If you don't know the custom content ID, use Get custom-content and filter
   * the results.
   */
  id: z.number(),
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor: z.string().optional(),
  /**
   * Maximum number of pages per result to return. If more results exist, use the `Link` header to retrieve a relative
   * URL that will return the next set of results.
   */
  limit: z.number().optional(),
  /** Used to sort the result by a particular field. */
  sort: z.string().optional(),
});

export type GetChildCustomContent = z.input<typeof GetChildCustomContentSchema>;
