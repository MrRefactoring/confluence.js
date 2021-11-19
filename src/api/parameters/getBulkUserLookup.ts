export interface GetBulkUserLookup {
  /** A list of accountId's of users to be returned. */
  accountId: string;
  /**
   * A multi-value parameter indicating which properties of the user to expand.
   *
   * - `operations` returns the operations that the user is allowed to do.
   * - PersonalSpace returns the user's personal space, if it exists.
   */
  expand?: string[];
  /**
   * The maximum number of results returned. Currently API returns 200 results max. If more that 200 ids are passed
   * first 200 will be returned.
   */
  limit?: number;
}
