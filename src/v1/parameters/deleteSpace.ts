import { z } from 'zod';

export const DeleteSpaceSchema = z.object({
  /** The key of the space to delete. */
  spaceKey: z.string(),
});

export type DeleteSpace = z.input<typeof DeleteSpaceSchema>;
