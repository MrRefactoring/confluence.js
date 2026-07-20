import { z } from 'zod';

export const GetGroupByGroupIdSchema = z.object({
  /** The id of the group. */
  id: z.string(),
});

export type GetGroupByGroupId = z.input<typeof GetGroupByGroupIdSchema>;
