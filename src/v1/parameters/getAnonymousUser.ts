import { z } from 'zod';

export const GetAnonymousUserSchema = z.object({
  /**
   * A multi-value parameter indicating which properties of the user to expand.
   *
   * - `operations` returns the operations that the user is allowed to do.
   */
  expand: z.array(z.enum(['operations'])).optional(),
});

export type GetAnonymousUser = z.input<typeof GetAnonymousUserSchema>;
