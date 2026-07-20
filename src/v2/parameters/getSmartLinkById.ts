import { z } from 'zod';

export const GetSmartLinkByIdSchema = z.object({
  /** The ID of the Smart Link in the content tree to be returned. */
  id: z.number(),
  /** Includes collaborators on the Smart Link. */
  includeCollaborators: z.boolean().optional(),
  /** Includes direct children of the Smart Link, as defined in the `ChildrenResponse` object. */
  includeDirectChildren: z.boolean().optional(),
  /**
   * Includes operations associated with this Smart Link in the response, as defined in the `Operation` object. The
   * number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will
   * be present to indicate if more results are available and a link to retrieve the rest of the results.
   */
  includeOperations: z.boolean().optional(),
  /**
   * Includes content properties associated with this Smart Link in the response. The number of results will be
   * limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if
   * more results are available and a link to retrieve the rest of the results.
   */
  includeProperties: z.boolean().optional(),
});

export type GetSmartLinkById = z.input<typeof GetSmartLinkByIdSchema>;
