import { z } from 'zod';

export const RemoveGroupByIdSchema = z.object({
  /** Id of the group to delete. */
  id: z.string(),
});

export type RemoveGroupById = z.input<typeof RemoveGroupByIdSchema>;
