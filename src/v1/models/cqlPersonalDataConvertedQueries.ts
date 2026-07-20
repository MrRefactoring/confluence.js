import { z } from 'zod';
import { apiObject } from '#/core';
/** The converted CQL queries. */

export const CQLPersonalDataConvertedQueriesSchema = apiObject({
  /** The list of converted CQL query strings with account IDs in place of user identifiers. */
  queryStrings: z.array(z.string()),
});

export type CQLPersonalDataConvertedQueries = z.infer<typeof CQLPersonalDataConvertedQueriesSchema>;
