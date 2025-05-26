import { z } from 'zod';

export const GetSpaceByIdOptions = z.strictObject({
  /**
   * The content format type to be returned in the description field of the response. If available, the representation
   * will be available under a response field of the same name under the `description` field.
   */
  descriptionFormat: z.enum(['plain', 'view']),
  include: z
    .strictObject({
      /**
       * If the icon for the space should be fetched or not.
       *
       * @default false
       */
      icon: z.boolean(),
      /**
       * Includes operations associated with this space in the response, as defined in the `Operation` object. The
       * number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property
       * will be present to indicate if more results are available and a link to retrieve the rest of the results.
       *
       * @default false
       */
      operations: z.boolean(),
      /**
       * Includes space properties associated with this space in the response. The number of results will be limited to
       * 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more
       * results are available and a link to retrieve the rest of the results.
       *
       * @default false
       */
      properties: z.boolean(),
      /**
       * Includes space permissions associated with this space in the response. The number of results will be limited to
       * 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more
       * results are available and a link to retrieve the rest of the results.
       *
       * @default false
       */
      permissions: z.boolean(),
      /**
       * Includes role assignments associated with this space in the response. This parameter is only accepted for EAP
       * sites. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links`
       * property will be present to indicate if more results are available and a link to retrieve the rest of the
       * results.
       *
       * @default false
       */
      roleAssignments: z.boolean(),
      /**
       * Includes labels associated with this space in the response. The number of results will be limited to 50 and
       * sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results
       * are available and a link to retrieve the rest of the results.
       *
       * @default false
       */
      labels: z.string(),
    })
    .partial(),
}).partial();

export type GetSpaceByIdOptions = z.infer<typeof GetSpaceByIdOptions>;
