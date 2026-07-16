import { z } from 'zod';

export const DeleteAttachmentSchema = z.object({
  /** The ID of the attachment to be deleted. */
  id: z.string(),
  /** If attempting to purge the attachment. */
  purge: z.boolean().optional(),
});

export type DeleteAttachment = z.input<typeof DeleteAttachmentSchema>;
