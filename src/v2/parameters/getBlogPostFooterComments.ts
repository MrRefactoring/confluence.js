import { z } from 'zod';
import { PrimaryBodyRepresentationSchema } from '../models';
import { CommentSortOrderSchema } from '../models';

export const GetBlogPostFooterCommentsSchema = z.object({
  /** The ID of the blog post for which footer comments should be returned. */
  id: z.number(),
  /**
   * The content format type to be returned in the `body` field of the response. If available, the representation will
   * be available under a response field of the same name under the `body` field.
   */
  bodyFormat: PrimaryBodyRepresentationSchema.optional(),
  /** Filter the footer comment being retrieved by its status. */
  status: z.array(z.enum(['current', 'deleted', 'trashed', 'historical', 'draft'])).optional(),
  /** Used to sort the result by a particular field. */
  sort: CommentSortOrderSchema.optional(),
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor: z.string().optional(),
  /**
   * Maximum number of footer comments per result to return. If more results exist, use the `Link` header to retrieve
   * a relative URL that will return the next set of results.
   */
  limit: z.number().optional(),
});

export type GetBlogPostFooterComments = z.input<typeof GetBlogPostFooterCommentsSchema>;
