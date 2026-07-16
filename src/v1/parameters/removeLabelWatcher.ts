import { z } from 'zod';

export const RemoveLabelWatcherSchema = z.object({
  /** The name of the label to remove the watcher from. */
  labelName: z.string(),
  /**
   * This parameter is no longer available and will be removed from the documentation soon. Use `accountId` instead. See
   * the [deprecation notice](/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for details.
   */
  key: z.string().optional(),
  /**
   * This parameter is no longer available and will be removed from the documentation soon. Use `accountId` instead. See
   * the [deprecation notice](/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/) for details.
   */
  username: z.string().optional(),
  /**
   * The account ID of the user. The accountId uniquely identifies the user across all Atlassian products. For example,
   * `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`.
   */
  accountId: z.string().optional(),
});

export type RemoveLabelWatcher = z.input<typeof RemoveLabelWatcherSchema>;
