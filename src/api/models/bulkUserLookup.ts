import { Icon } from './icon';
import { OperationCheckResult } from './operationCheckResult';
import { UserDetails } from './userDetails';
import { Space } from './space';
import { GenericLinks } from './genericLinks';

export interface BulkUserLookup {
  type: string;
  /**
   * This property is no longer available and will be removed from the documentation soon. Use `accountId` instead. See
   * the [deprecation notice](/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for details.
   */
  username?: string;
  /**
   * This property is no longer available and will be removed from the documentation soon. Use `accountId` instead. See
   * the [deprecation notice](/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for details.
   */
  userKey?: string;
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`.
   */
  accountId: string;
  /** The account type of the user, may return empty string if unavailable. */
  accountType: string;
  /** The email address of the user. Depending on the user's privacy setting, this may return an empty string. */
  email: string;
  /** The public name or nickname of the user. Will always contain a value. */
  publicName: string;
  profilePicture: Icon;
  /** The display name of the user. Depending on the user's privacy setting, this may be the same as publicName. */
  displayName: string;
  operations?: OperationCheckResult[];
  details?: UserDetails;
  personalSpace?: Space;
  _expandable: {
    operations?: string;
    details?: string;
    personalSpace?: string;
  };
  _links: GenericLinks;
}
