import { z } from 'zod';

export const GetSpacePropertiesSchema = z.object({
  /** The ID of the space for which space properties should be returned. */
  spaceId: z.number(),
  /**
   * The key of the space property to retrieve. This should be used when a user knows the key of their property, but
   * needs to retrieve the id for use in other methods.
   */
  key: z.string().optional(),
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
});

export type GetSpaceProperties = z.input<typeof GetSpacePropertiesSchema>;
