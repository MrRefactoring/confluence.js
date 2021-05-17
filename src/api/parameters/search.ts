export interface Search {
  /**
   * The CQL query to be used for the search. See [Advanced Searching using
   * CQL](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/) for instructions on how to
   * build a CQL query.
   *
   * @example
   *   Example queries:
   *
   *   cql=type=user // will return all users
   *   cql=user="1234" // will return user with accountId “1234”
   *
   *   // You can also use IN, NOT IN, != operators
   *
   *   cql=user IN ("12", "34") // will return users with accountids “12” and “34”
   *   cql=user.fullname~jo // will return users with nickname/full name starting with “jo”
   *   cql=user.accountid="123" // will return user with accountId “123”
   */
  cql: string;
  /** The starting index of the returned users. */
  start?: number;
  /**
   * The maximum number of content objects to return per page. Note, this may be restricted by fixed system limits.
   *
   * @default 25
   * @Minimum 0
   */
  limit?: number;
  /**
   * The space, content, and content status to execute the search against.
   *
   * - SpaceKey Key of the space to search against. Optional.
   * - ContentId ID of the content to search against. Optional. Must be in the space specified by spaceKey.
   * - ContentStatuses Content statuses to search against. Optional. Specify these values in an object.
   *
   * @example
   *   "cqlcontext={%22spaceKey%22:%22TEST%22, %22contentId%22:%22123%22}";
   */
  cqlcontext?: string;
  /** Pointer to a set of search results, returned as part of the *next* or *prev* URL from the previous search call. */
  cursor?: string;
  /**
   * Include content from archived spaces in the results.
   *
   * @default false
   */
  includeArchivedSpaces?: boolean;
}
