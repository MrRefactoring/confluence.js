import { z } from 'zod';

export const SearchUserSchema = z.object({
  /**
   * The CQL query to be used for the search. See [Advanced Searching using
   * CQL](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/) for instructions on how to
   * build a CQL query.
   *
   * Example queries: cql=type=user will return up to 10k users cql=user="1234" will return user with accountId "1234"
   * You can also use IN, NOT IN, != operators cql=user IN ("12", "34") will return users with accountids "12" and "34"
   * cql=user.fullname~jo will return users with nickname/full name starting with "jo" cql=user.accountid="123" will
   * return user with accountId "123"
   */
  cql: z.string(),
  /** The starting index of the returned users. */
  start: z.number().optional(),
  /** The maximum number of user objects to return per page. Note, this may be restricted by fixed system limits. */
  limit: z.number().optional(),
  /**
   * A multi-value parameter indicating which properties of the user to expand.
   *
   * - `operations` returns the operations for the user, which are used when setting permissions.
   * - `personalSpace` returns the personal space of the user.
   */
  expand: z.array(z.string()).optional(),
  /**
   * Filters users by permission type. Use `none` to default to licensed users, `externalCollaborator` for
   * external/guest users, and `all` to include all permission types.
   */
  sitePermissionTypeFilter: z.enum(['all', 'externalCollaborator', 'none']).optional(),
});

export type SearchUser = z.input<typeof SearchUserSchema>;
