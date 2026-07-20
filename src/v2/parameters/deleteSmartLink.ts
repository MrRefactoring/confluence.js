import { z } from 'zod';

export const DeleteSmartLinkSchema = z.object({
  /** The ID of the Smart Link in the content tree to be deleted. */
  id: z.number(),
});

export type DeleteSmartLink = z.input<typeof DeleteSmartLinkSchema>;
