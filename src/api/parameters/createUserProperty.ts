import { UserPropertyCreate } from '../models';

export interface CreateUserProperty extends UserPropertyCreate {
  /**
   * The account ID of the user. The accountId uniquely identifies the user across all Atlassian products. For example,
   * 384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192
   */
  userId: string;
  /** The key of the user property. */
  key: string;
}
