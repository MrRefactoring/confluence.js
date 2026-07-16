import { z } from 'zod';
import { PrimaryBodyRepresentationSchema } from '../models';
import { PageSortOrderSchema } from '../models';

export const GetLabelPagesSchema = z.object({
  /** The ID of the label for which pages should be returned. */
  id: z.number(),
  /** Filter the results based on space ids. Multiple space ids can be specified as a comma-separated list. */
  spaceId: z.array(z.number()).optional(),
  /**
   * The content format types to be returned in the `body` field of the response. If available, the representation will
   * be available under a response field of the same name under the `body` field.
   */
  bodyFormat: PrimaryBodyRepresentationSchema.optional(),
  /** Used to sort the result by a particular field. */
  sort: PageSortOrderSchema.optional(),
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
});

export type GetLabelPages = z.input<typeof GetLabelPagesSchema>;
