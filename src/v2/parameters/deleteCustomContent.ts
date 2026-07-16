import { z } from 'zod';

export const DeleteCustomContentSchema = z.object({
  /** The ID of the custom content to be deleted. */
  id: z.number(),
  /** If attempting to purge the custom content. */
  purge: z.boolean().optional(),
});

export type DeleteCustomContent = z.input<typeof DeleteCustomContentSchema>;
