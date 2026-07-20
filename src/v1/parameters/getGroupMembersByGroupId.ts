import { z } from 'zod';

export const GetGroupMembersByGroupIdSchema = z.object({
  /** The id of the group to be queried for its members. */
  groupId: z.string(),
  /** The starting index of the returned users. */
  start: z.number().optional(),
  /** The maximum number of users to return per page. Note, this may be restricted by fixed system limits. */
  limit: z.number().optional(),
  /**
   * Whether to include total size parameter in the results. Note, fetching total size property is an expensive
   * operation; use it if your use case needs this value.
   */
  shouldReturnTotalSize: z.boolean().optional(),
  /**
   * A multi-value parameter indicating which properties of the user to expand.
   *
   * - `operations` returns the operations that the user is allowed to do.
   * - `personalSpace` returns the user's personal space, if it exists.
   * - `isExternalCollaborator`(@deprecated) see `isGuest` in response to find out whether the user is a guest.
   */
  expand: z.array(z.enum(['operations', 'personalSpace', 'isExternalCollaborator'])).optional(),
});

export type GetGroupMembersByGroupId = z.input<typeof GetGroupMembersByGroupIdSchema>;
