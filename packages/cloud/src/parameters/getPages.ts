import { z } from 'zod';
import { PageSortOrderSchema } from '../models/index.js';
import { PrimaryBodyRepresentationSchema } from '../models/index.js';

export const GetPagesSchema = z.object({
  /** Filter the results based on page ids. Multiple page ids can be specified as a comma-separated list. */
  id: z.array(z.number()).optional(),
  /** Filter the results based on space ids. Multiple space ids can be specified as a comma-separated list. */
  spaceId: z.array(z.number()).optional(),
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
  /** Filter the results to pages based on their subtype. */
  subtype: z.enum(['live', 'page']).optional(),
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

export type GetPages = z.input<typeof GetPagesSchema>;
