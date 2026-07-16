import { z } from 'zod';
import { apiObject } from '#/core';
/** The CQL queries to be converted. */

export const CQLPersonalDataMigrationRequestSchema = apiObject({
  /** A list of queries with user identifiers. Maximum of 100 queries. */
  queryStrings: z.array(z.string()),
});

export type CQLPersonalDataMigrationRequest = z.infer<typeof CQLPersonalDataMigrationRequestSchema>;
