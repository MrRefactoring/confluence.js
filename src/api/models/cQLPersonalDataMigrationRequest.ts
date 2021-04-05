/**
 * The CQL queries to be converted. */
export interface CQLPersonalDataMigrationRequest {
  /** A list of queries with user identifiers. Maximum of 100 queries. */
  queryStrings: string[];
}
