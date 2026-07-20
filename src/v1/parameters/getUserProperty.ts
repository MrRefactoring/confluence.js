import { z } from 'zod';

export const GetUserPropertySchema = z.object({
  /** The account ID of the user to be queried for its properties. */
  userId: z.string(),
  /** The key of the user property. */
  key: z.string(),
});

export type GetUserProperty = z.input<typeof GetUserPropertySchema>;
