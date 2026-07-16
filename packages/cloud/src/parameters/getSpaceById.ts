import { z } from 'zod';
import { SpaceDescriptionBodyRepresentationSchema } from '../models/index.js';

export const GetSpaceByIdSchema = z.object({
  /** The ID of the space to be returned. */
  id: z.number(),
  /**
   * The content format type to be returned in the `description` field of the response. If available, the
   * representation will be available under a response field of the same name under the `description` field.
   */
  descriptionFormat: SpaceDescriptionBodyRepresentationSchema.optional(),
  /** If the icon for the space should be fetched or not. */
  includeIcon: z.boolean().optional(),
  /**
   * Includes operations associated with this space in the response, as defined in the `Operation` object. The number
   * of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be
   * present to indicate if more results are available and a link to retrieve the rest of the results.
   */
  includeOperations: z.boolean().optional(),
  /**
   * Includes space properties associated with this space in the response. The number of results will be limited to 50
   * and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results
   * are available and a link to retrieve the rest of the results.
   */
  includeProperties: z.boolean().optional(),
  /**
   * Includes space permissions associated with this space in the response. The number of results will be limited to
   * 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more
   * results are available and a link to retrieve the rest of the results.
   */
  includePermissions: z.boolean().optional(),
  /**
   * Includes role assignments associated with this space in the response. This parameter is only accepted for EAP
   * sites. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links`
   * property will be present to indicate if more results are available and a link to retrieve the rest of the
   * results.
   */
  includeRoleAssignments: z.boolean().optional(),
  /**
   * Includes labels associated with this space in the response. The number of results will be limited to 50 and
   * sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are
   * available and a link to retrieve the rest of the results.
   */
  includeLabels: z.boolean().optional(),
});

export type GetSpaceById = z.input<typeof GetSpaceByIdSchema>;
