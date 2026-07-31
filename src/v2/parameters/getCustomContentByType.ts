import { z } from 'zod';
import { CustomContentSortOrderSchema } from '../models';
import { CustomContentBodyRepresentationSchema } from '../models';

export const GetCustomContentByTypeSchema = z.object({
  /**
   * The type of custom content being requested. See: https://developer.atlassian.com/cloud/confluence/custom-content/
   * for additional details on custom content.
   */
  type: z.string(),
  /**
   * Filter the results based on custom content ids. Multiple custom content ids can be specified as a comma-separated
   * list.
   */
  id: z.array(z.number()).optional(),
  /** Filter the results based on space ids. Multiple space ids can be specified as a comma-separated list. */
  spaceId: z.array(z.number()).optional(),
  /** Used to sort the result by a particular field. */
  sort: CustomContentSortOrderSchema.optional(),
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor: z.string().optional(),
  /**
   * Maximum number of pages per result to return. If more results exist, use the `Link` header to retrieve a relative
   * URL that will return the next set of results.
   */
  limit: z.number().optional(),
  /**
   * The content format types to be returned in the `body` field of the response. If available, the representation will
   * be available under a response field of the same name under the `body` field.
   *
   * Note: If the custom content body type is `storage`, the `storage` and `atlas_doc_format` body formats are able to
   * be returned. If the custom content body type is `raw`, only the `raw` body format is able to be returned.
   */
  bodyFormat: CustomContentBodyRepresentationSchema.optional(),
});

export type GetCustomContentByType = z.input<typeof GetCustomContentByTypeSchema>;
