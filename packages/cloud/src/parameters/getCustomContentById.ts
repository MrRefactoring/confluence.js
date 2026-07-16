import { z } from 'zod';
import { CustomContentBodyRepresentationSingleSchema } from '../models/index.js';

export const GetCustomContentByIdSchema = z.object({
  /**
   * The ID of the custom content to be returned. If you don't know the custom content ID, use Get Custom Content by
   * Type and filter the results.
   */
  id: z.number(),
  /**
   * The content format types to be returned in the `body` field of the response. If available, the representation
   * will be available under a response field of the same name under the `body` field.
   *
   * Note: If the custom content body type is `storage`, the `storage` and `atlas_doc_format` body formats are able to
   * be returned. If the custom content body type is `raw`, only the `raw` body format is able to be returned.
   */
  bodyFormat: CustomContentBodyRepresentationSingleSchema.optional(),
  /**
   * Allows you to retrieve a previously published version. Specify the previous version's number to retrieve its
   * details.
   */
  version: z.number().optional(),
  /**
   * Includes labels associated with this custom content in the response. The number of results will be limited to 50
   * and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results
   * are available and a link to retrieve the rest of the results.
   */
  includeLabels: z.boolean().optional(),
  /**
   * Includes content properties associated with this custom content in the response. The number of results will be
   * limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if
   * more results are available and a link to retrieve the rest of the results.
   */
  includeProperties: z.boolean().optional(),
  /**
   * Includes operations associated with this custom content in the response, as defined in the `Operation` object.
   * The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property
   * will be present to indicate if more results are available and a link to retrieve the rest of the results.
   */
  includeOperations: z.boolean().optional(),
  /**
   * Includes versions associated with this custom content in the response. The number of results will be limited to
   * 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more
   * results are available and a link to retrieve the rest of the results.
   */
  includeVersions: z.boolean().optional(),
  /**
   * Includes the current version associated with this custom content in the response. By default this is included and
   * can be omitted by setting the value to `false`.
   */
  includeVersion: z.boolean().optional(),
  /** Includes collaborators on the custom content. */
  includeCollaborators: z.boolean().optional(),
});

export type GetCustomContentById = z.input<typeof GetCustomContentByIdSchema>;
