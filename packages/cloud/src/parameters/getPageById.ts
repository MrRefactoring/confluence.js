import { z } from 'zod';
import { PrimaryBodyRepresentationSingleSchema } from '../models/index.js';

export const GetPageByIdSchema = z.object({
  /** The ID of the page to be returned. If you don't know the page ID, use Get pages and filter the results. */
  id: z.number(),
  /**
   * The content format types to be returned in the `body` field of the response. If available, the representation
   * will be available under a response field of the same name under the `body` field.
   */
  bodyFormat: PrimaryBodyRepresentationSingleSchema.optional(),
  /** Retrieve the draft version of this page. */
  getDraft: z.boolean().optional(),
  /** Filter the page being retrieved by its status. */
  status: z.array(z.enum(['current', 'archived', 'trashed', 'deleted', 'historical', 'draft'])).optional(),
  /**
   * Allows you to retrieve a previously published version. Specify the previous version's number to retrieve its
   * details.
   */
  version: z.number().optional(),
  /**
   * Includes labels associated with this page in the response. The number of results will be limited to 50 and sorted
   * in the default sort order. A `meta` and `_links` property will be present to indicate if more results are
   * available and a link to retrieve the rest of the results.
   */
  includeLabels: z.boolean().optional(),
  /**
   * Includes content properties associated with this page in the response. The number of results will be limited to
   * 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more
   * results are available and a link to retrieve the rest of the results.
   */
  includeProperties: z.boolean().optional(),
  /**
   * Includes operations associated with this page in the response, as defined in the `Operation` object. The number
   * of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be
   * present to indicate if more results are available and a link to retrieve the rest of the results.
   */
  includeOperations: z.boolean().optional(),
  /**
   * Includes likes associated with this page in the response. The number of results will be limited to 50 and sorted
   * in the default sort order. A `meta` and `_links` property will be present to indicate if more results are
   * available and a link to retrieve the rest of the results.
   */
  includeLikes: z.boolean().optional(),
  /**
   * Includes versions associated with this page in the response. The number of results will be limited to 50 and
   * sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are
   * available and a link to retrieve the rest of the results.
   */
  includeVersions: z.boolean().optional(),
  /**
   * Includes the current version associated with this page in the response. By default this is included and can be
   * omitted by setting the value to `false`.
   */
  includeVersion: z.boolean().optional(),
  /** Includes whether this page has been favorited by the current user. */
  includeFavoritedByCurrentUserStatus: z.boolean().optional(),
  /** Includes web resources that can be used to render page content on a client. */
  includeWebresources: z.boolean().optional(),
  /** Includes collaborators on the page. */
  includeCollaborators: z.boolean().optional(),
  /** Includes direct children of the page, as defined in the `ChildrenResponse` object. */
  includeDirectChildren: z.boolean().optional(),
});

export type GetPageById = z.input<typeof GetPageByIdSchema>;
