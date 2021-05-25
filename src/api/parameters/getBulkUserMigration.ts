export interface GetBulkUserMigration {
  /**
   * The key of a user. To specify multiple users, pass multiple key parameters separated by ampersands. For example,
   * key=mia&key=alana. Required if username isn't provided. Cannot be provided if username is present.
   */
  key: string[];
  /**
   * The username of a user. To specify multiple users, pass multiple username parameters separated by ampersands. For
   * example, username=mia&username=alana. Required if key isn't provided. Cannot be provided if key is present.
   */
  username?: string[];
  /** The index of the first item to return in a page of results (page offset). */
  start?: number;
  /** The maximum number of results to return per page. Note, this may be restricted by fixed system limits. */
  limit?: number;
}
