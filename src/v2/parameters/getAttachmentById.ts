import { z } from 'zod';

export const GetAttachmentByIdSchema = z.object({
  /**
   * The ID of the attachment to be returned. If you don't know the attachment's ID, use Get attachments for
   * page/blogpost/custom content.
   */
  id: z.string(),
  /**
   * Allows you to retrieve a previously published version. Specify the previous version's number to retrieve its
   * details.
   */
  version: z.number().optional(),
  /**
   * Includes labels associated with this attachment in the response. The number of results will be limited to 50 and
   * sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are
   * available and a link to retrieve the rest of the results.
   */
  includeLabels: z.boolean().optional(),
  /**
   * Includes content properties associated with this attachment in the response. The number of results will be
   * limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if
   * more results are available and a link to retrieve the rest of the results.
   */
  includeProperties: z.boolean().optional(),
  /**
   * Includes operations associated with this attachment in the response, as defined in the `Operation` object. The
   * number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will
   * be present to indicate if more results are available and a link to retrieve the rest of the results.
   */
  includeOperations: z.boolean().optional(),
  /**
   * Includes versions associated with this attachment in the response. The number of results will be limited to 50
   * and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results
   * are available and a link to retrieve the rest of the results.
   */
  includeVersions: z.boolean().optional(),
  /**
   * Includes the current version associated with this attachment in the response. By default this is included and can
   * be omitted by setting the value to `false`.
   */
  includeVersion: z.boolean().optional(),
  /** Includes collaborators on the attachment. */
  includeCollaborators: z.boolean().optional(),
});

export type GetAttachmentById = z.input<typeof GetAttachmentByIdSchema>;
