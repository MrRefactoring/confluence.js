import { z } from 'zod';
import { PrimaryBodyRepresentationSingleSchema } from '../models/index.js';

export const GetBlogPostByIdSchema = z.object({
  /**
   * The ID of the blog post to be returned. If you don't know the blog post ID, use Get blog posts and filter the
   * results.
   */
  id: z.number(),
  /**
   * The content format types to be returned in the `body` field of the response. If available, the representation
   * will be available under a response field of the same name under the `body` field.
   */
  bodyFormat: PrimaryBodyRepresentationSingleSchema.optional(),
  /** Retrieve the draft version of this blog post. */
  getDraft: z.boolean().optional(),
  /** Filter the blog post being retrieved by its status. */
  status: z.array(z.enum(['current', 'trashed', 'deleted', 'historical', 'draft'])).optional(),
  /**
   * Allows you to retrieve a previously published version. Specify the previous version's number to retrieve its
   * details.
   */
  version: z.number().optional(),
  /**
   * Includes labels associated with this blog post in the response. The number of results will be limited to 50 and
   * sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are
   * available and a link to retrieve the rest of the results.
   */
  includeLabels: z.boolean().optional(),
  /**
   * Includes content properties associated with this blog post in the response. The number of results will be limited
   * to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more
   * results are available and a link to retrieve the rest of the results.
   */
  includeProperties: z.boolean().optional(),
  /**
   * Includes operations associated with this blog post in the response, as defined in the `Operation` object. The
   * number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will
   * be present to indicate if more results are available and a link to retrieve the rest of the results.
   */
  includeOperations: z.boolean().optional(),
  /**
   * Includes likes associated with this blog post in the response. The number of results will be limited to 50 and
   * sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are
   * available and a link to retrieve the rest of the results.
   */
  includeLikes: z.boolean().optional(),
  /**
   * Includes versions associated with this blog post in the response. The number of results will be limited to 50 and
   * sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are
   * available and a link to retrieve the rest of the results.
   */
  includeVersions: z.boolean().optional(),
  /**
   * Includes the current version associated with this blog post in the response. By default this is included and can
   * be omitted by setting the value to `false`.
   */
  includeVersion: z.boolean().optional(),
  /** Includes whether this blog post has been favorited by the current user. */
  includeFavoritedByCurrentUserStatus: z.boolean().optional(),
  /** Includes web resources that can be used to render blog post content on a client. */
  includeWebresources: z.boolean().optional(),
  /** Includes collaborators on the blog post. */
  includeCollaborators: z.boolean().optional(),
});

export type GetBlogPostById = z.input<typeof GetBlogPostByIdSchema>;
