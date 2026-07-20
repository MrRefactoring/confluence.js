import { z } from 'zod';

export const DeletePageTreeSchema = z.object({
  /** The ID of the content which forms root of the page tree, to be deleted. */
  id: z.string(),
});

export type DeletePageTree = z.input<typeof DeletePageTreeSchema>;
