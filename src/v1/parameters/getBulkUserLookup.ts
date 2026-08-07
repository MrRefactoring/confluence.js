import { z } from 'zod';
import { openEnum } from '#/core';

export const GetBulkUserLookupSchema = z.object({
  /** A list of accountId's of users to be returned. */
  accountId: z.string(),
  /**
   * A multi-value parameter indicating which properties of the user to expand.
   *
   * - `operations` returns the operations that the user is allowed to do.
   * - `personalSpace` returns the user's personal space, if it exists.
   * - `isExternalCollaborator`(@deprecated) use `isGuest` instead to return whether the user is a guest.
   */
  expand: z.array(openEnum(['operations', 'personalSpace', 'isExternalCollaborator'])).optional(),
});

export type GetBulkUserLookup = z.input<typeof GetBulkUserLookupSchema>;
