import { z } from 'zod';
import type { AttachmentInput } from '#/core';

export const CreateOrUpdateAttachmentsSchema = z.object({
  /** The ID of the content to add the attachment to. */
  id: z.string(),
  /** The status of the content that the attachment is being added to. This should always be set to 'current'. */
  status: z.enum(['current', 'draft']).optional(),
  attachments: z.custom<AttachmentInput | AttachmentInput[]>(),
});

export type CreateOrUpdateAttachments = z.input<typeof CreateOrUpdateAttachmentsSchema>;
