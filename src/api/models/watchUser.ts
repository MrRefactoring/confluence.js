import { Icon } from './icon';
import { OperationCheckResult } from './operationCheckResult';
import { UserDetails } from './userDetails';

/**
 * This essentially the same as the `User` object, but no `_links` property and*
 * no `_expandable` property (therefore, different required fields). */
export interface WatchUser {
  type: string;
  /** This property is no longer available and will be removed from the documentation soon.
   Use `accountId` instead.
   See the [deprecation notice](/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  username?: string;
  /** This property is no longer available and will be removed from the documentation soon.
   Use `accountId` instead.
   See the [deprecation notice](/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  userKey?: string;
  /** The account ID of the user, which uniquely identifies the user across all Atlassian products.
   For example, `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`. */
  accountId: string;
  profilePicture: Icon;
  displayName: string;
  operations: OperationCheckResult[];
  details: UserDetails;
}
