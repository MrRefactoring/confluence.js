import { z } from 'zod';
import { apiObject } from '#/core';

export const OptionalFieldMetaSchema = apiObject({
  /** Indicates if there are more available results that can be fetched. */
  hasMore: z.boolean().optional(),
  /**
   * A token that can be used in the query parameter of the endpoint returned in the `_links` property to retrieve the
   * next set of results.
   */
  cursor: z.string().optional(),
  /** Number of items in the collection. */
  count: z.number().optional(),
});

export type OptionalFieldMeta = z.infer<typeof OptionalFieldMetaSchema>;
