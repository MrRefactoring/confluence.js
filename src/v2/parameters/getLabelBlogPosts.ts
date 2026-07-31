import { z } from 'zod';
import { PrimaryBodyRepresentationSchema } from '../models';
import { BlogPostSortOrderSchema } from '../models';

export const GetLabelBlogPostsSchema = z.object({
  /** The ID of the label for which blog posts should be returned. */
  id: z.number(),
  /** Filter the results based on space ids. Multiple space ids can be specified as a comma-separated list. */
  spaceId: z.array(z.number()).optional(),
  /**
   * The content format types to be returned in the `body` field of the response. If available, the representation will
   * be available under a response field of the same name under the `body` field.
   */
  bodyFormat: PrimaryBodyRepresentationSchema.optional(),
  /** Used to sort the result by a particular field. */
  sort: BlogPostSortOrderSchema.optional(),
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

export type GetLabelBlogPosts = z.input<typeof GetLabelBlogPostsSchema>;
