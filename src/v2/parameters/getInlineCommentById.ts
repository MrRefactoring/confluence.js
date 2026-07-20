import { z } from 'zod';
import { PrimaryBodyRepresentationSingleSchema } from '../models';

export const GetInlineCommentByIdSchema = z.object({
  /** The ID of the comment to be retrieved. */
  commentId: z.number(),
  /**
   * The content format type to be returned in the `body` field of the response. If available, the representation will
   * be available under a response field of the same name under the `body` field.
   */
  bodyFormat: PrimaryBodyRepresentationSingleSchema.optional(),
  /**
   * Allows you to retrieve a previously published version. Specify the previous version's number to retrieve its
   * details.
   */
  version: z.number().optional(),
  /**
   * Includes content properties associated with this inline comment in the response. The number of results will be
   * limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if
   * more results are available and a link to retrieve the rest of the results.
   */
  includeProperties: z.boolean().optional(),
  /**
   * Includes operations associated with this inline comment in the response, as defined in the `Operation` object.
   * The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property
   * will be present to indicate if more results are available and a link to retrieve the rest of the results.
   */
  includeOperations: z.boolean().optional(),
  /**
   * Includes likes associated with this inline comment in the response. The number of results will be limited to 50
   * and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results
   * are available and a link to retrieve the rest of the results.
   */
  includeLikes: z.boolean().optional(),
  /**
   * Includes versions associated with this inline comment in the response. The number of results will be limited to
   * 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more
   * results are available and a link to retrieve the rest of the results.
   */
  includeVersions: z.boolean().optional(),
  /**
   * Includes the current version associated with this inline comment in the response. By default this is included and
   * can be omitted by setting the value to `false`.
   */
  includeVersion: z.boolean().optional(),
});

export type GetInlineCommentById = z.input<typeof GetInlineCommentByIdSchema>;
