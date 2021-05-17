export interface UserSearch {
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
  /**
   * The starting index of the returned users.
   *
   * @default 0
   * @Minimum 0
   */
  start?: number;
  /**
   * The maximum number of user objects to return per page. Note, this may be restricted by fixed system limits.
   *
   * @default 25
   * @Minimum 0
   */
  limit?: number;
}
