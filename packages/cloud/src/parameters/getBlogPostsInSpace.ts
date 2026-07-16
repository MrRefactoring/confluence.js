import { z } from 'zod';
import { BlogPostSortOrderSchema } from '../models/index.js';
import { PrimaryBodyRepresentationSchema } from '../models/index.js';

export const GetBlogPostsInSpaceSchema = z.object({
  /** The ID of the space for which blog posts should be returned. */
  id: z.number(),
  /** Used to sort the result by a particular field. */
  sort: BlogPostSortOrderSchema.optional(),
  /** Filter the results to blog posts based on their status. By default, `current` is used. */
  status: z.array(z.enum(['current', 'deleted', 'trashed'])).optional(),
  /** Filter the results to blog posts based on their title. */
  title: z.string().optional(),
  /**
   * The content format types to be returned in the `body` field of the response. If available, the representation
   * will be available under a response field of the same name under the `body` field.
   */
  bodyFormat: PrimaryBodyRepresentationSchema.optional(),
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor: z.string().optional(),
  /**
   * Maximum number of blog posts per result to return. If more results exist, use the `Link` header to retrieve a
   * relative URL that will return the next set of results.
   */
  limit: z.number().optional(),
});

export type GetBlogPostsInSpace = z.input<typeof GetBlogPostsInSpaceSchema>;
