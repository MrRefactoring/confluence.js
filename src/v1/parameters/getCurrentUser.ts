import { z } from 'zod';

export const GetCurrentUserSchema = z.object({
  /**
   * A multi-value parameter indicating which properties of the user to expand.
   *
   * - `operations` returns the operations that the user is allowed to do.
   * - `personalSpace` returns the user's personal space, if it exists.
   * - `isExternalCollaborator`(@deprecated) see `isGuest` in response to find out whether the user is a guest.
   */
  expand: z.array(z.enum(['operations', 'personalSpace', 'isExternalCollaborator'])).optional(),
});

export type GetCurrentUser = z.input<typeof GetCurrentUserSchema>;
