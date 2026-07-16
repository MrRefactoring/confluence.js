import { z } from 'zod';
import { SpaceSortOrderSchema } from '../models/index.js';

export const GetDataPolicySpacesSchema = z.object({
  /** Filter the results to spaces based on their IDs. Multiple IDs can be specified as a comma-separated list. */
  ids: z.array(z.number()).optional(),
  /** Filter the results to spaces based on their keys. Multiple keys can be specified as a comma-separated list. */
  keys: z.array(z.string()).optional(),
  /** Used to sort the result by a particular field. */
  sort: SpaceSortOrderSchema.optional(),
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor: z.string().optional(),
  /**
   * Maximum number of spaces per result to return. If more results exist, use the `Link` response header to retrieve
   * a relative URL that will return the next set of results.
   */
  limit: z.number().optional(),
});

export type GetDataPolicySpaces = z.input<typeof GetDataPolicySpacesSchema>;
