import { z } from 'zod';
import { PageSortOrderSchema } from '../models';
import { PrimaryBodyRepresentationSchema } from '../models';

export const GetPagesInSpaceSchema = z.object({
  /** The ID of the space for which pages should be returned. */
  id: z.number(),
  /** Filter the results to pages at the root level of the space or to all pages in the space. */
  depth: z.enum(['all', 'root']).optional(),
  /** Used to sort the result by a particular field. */
  sort: PageSortOrderSchema.optional(),
  /** Filter the results to pages based on their status. By default, `current` and `archived` are used. */
  status: z.array(z.enum(['current', 'archived', 'deleted', 'trashed'])).optional(),
  /** Filter the results to pages based on their title. */
  title: z.string().optional(),
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
   * Maximum number of pages per result to return. If more results exist, use the `Link` header to retrieve a relative
   * URL that will return the next set of results.
   */
  limit: z.number().optional(),
});

export type GetPagesInSpace = z.input<typeof GetPagesInSpaceSchema>;
