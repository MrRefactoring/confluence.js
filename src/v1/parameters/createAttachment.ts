import { z } from 'zod';

export const CreateAttachmentSchema = z.object({
  /** The ID of the content to add the attachment to. */
  id: z.string(),
  /** The status of the content that the attachment is being added to. */
  status: z.enum(['current', 'draft']).optional(),
  body: z.record(z.string(), z.any()),
});

export type CreateAttachment = z.input<typeof CreateAttachmentSchema>;
