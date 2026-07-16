import { z } from 'zod';

export const UpdateAttachmentDataSchema = z.object({
  /** The ID of the content that the attachment is attached to. */
  id: z.string(),
  /** The ID of the attachment to update. */
  attachmentId: z.string(),
  body: z.record(z.string(), z.any()),
});

export type UpdateAttachmentData = z.input<typeof UpdateAttachmentDataSchema>;
