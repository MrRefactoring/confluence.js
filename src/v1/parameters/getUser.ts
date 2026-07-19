import { z } from 'zod';

export const GetUserSchema = z.object({
  /**
   * The account ID of the user. The accountId uniquely identifies the user across all Atlassian products. For
   * example, `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`.
   */
  accountId: z.string(),
  /**
   * A multi-value parameter indicating which properties of the user to expand.
   *
   * - `operations` returns the operations that the user is allowed to do.
   * - `personalSpace` returns the user's personal space, if it exists.
   * - `isExternalCollaborator`(@deprecated) see `isGuest` in response to find out whether the user is a guest.
   */
  expand: z.array(z.enum(['operations', 'personalSpace', 'isExternalCollaborator'])).optional(),
});

export type GetUser = z.input<typeof GetUserSchema>;
