import { z } from 'zod';

export const GetUserPropertiesSchema = z.object({
  /** The account ID of the user to be queried for its properties. */
  userId: z.string(),
  /** The starting index of the returned properties. */
  start: z.number().optional(),
  /** The maximum number of properties to return per page. Note, this may be restricted by fixed system limits. */
  limit: z.number().optional(),
});

export type GetUserProperties = z.input<typeof GetUserPropertiesSchema>;
