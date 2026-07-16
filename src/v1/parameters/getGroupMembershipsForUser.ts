import { z } from 'zod';

export const GetGroupMembershipsForUserSchema = z.object({
  /**
   * The account ID of the user. The accountId uniquely identifies the user across all Atlassian products. For example,
   * `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`.
   */
  accountId: z.string(),
  /** The starting index of the returned groups. */
  start: z.number().optional(),
  /** The maximum number of groups to return per page. Note, this may be restricted by fixed system limits. */
  limit: z.number().optional(),
});

export type GetGroupMembershipsForUser = z.input<typeof GetGroupMembershipsForUserSchema>;
