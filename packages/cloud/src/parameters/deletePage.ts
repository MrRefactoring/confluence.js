import { z } from 'zod';

export const DeletePageSchema = z.object({
  /** The ID of the page to be deleted. */
  id: z.number(),
  /** If attempting to purge the page. */
  purge: z.boolean().optional(),
  /** If attempting to delete a page that is a draft. */
  draft: z.boolean().optional(),
});

export type DeletePage = z.input<typeof DeletePageSchema>;
