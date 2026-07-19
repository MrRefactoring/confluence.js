import { z } from 'zod';
import { CustomContentBodyRepresentationSchema } from '../models';
import { VersionSortOrderSchema } from '../models';

export const GetCustomContentVersionsSchema = z.object({
  /**
   * The ID of the custom content to be queried for its versions. If you don't know the custom content ID, use Get
   * custom-content by type and filter the results.
   */
  customContentId: z.number(),
  /**
   * The content format types to be returned in the `body` field of the response. If available, the representation
   * will be available under a response field of the same name under the `body` field.
   *
   * Note: If the custom content body type is `storage`, the `storage` and `atlas_doc_format` body formats are able to
   * be returned. If the custom content body type is `raw`, only the `raw` body format is able to be returned.
   */
  bodyFormat: CustomContentBodyRepresentationSchema.optional(),
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor: z.string().optional(),
  /**
   * Maximum number of versions per result to return. If more results exist, use the `Link` header to retrieve a
   * relative URL that will return the next set of results.
   */
  limit: z.number().optional(),
  /** Used to sort the result by a particular field. */
  sort: VersionSortOrderSchema.optional(),
});

export type GetCustomContentVersions = z.input<typeof GetCustomContentVersionsSchema>;
