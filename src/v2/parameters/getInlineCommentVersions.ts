import { z } from 'zod';
import { PrimaryBodyRepresentationSchema } from '../models';
import { VersionSortOrderSchema } from '../models';

export const GetInlineCommentVersionsSchema = z.object({
  /** The ID of the inline comment for which versions should be returned */
  id: z.number(),
  /**
   * The content format types to be returned in the `body` field of the response. If available, the representation
   * will be available under a response field of the same name under the `body` field.
   */
  bodyFormat: PrimaryBodyRepresentationSchema.optional(),
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

export type GetInlineCommentVersions = z.input<typeof GetInlineCommentVersionsSchema>;
