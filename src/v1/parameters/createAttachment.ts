import { z } from 'zod';
import { openEnum } from '#/core';
import type { AttachmentInput } from '#/core';

export const CreateAttachmentSchema = z.object({
  /** The ID of the content to add the attachment to. */
  id: z.string(),
  /** The status of the content that the attachment is being added to. */
  status: openEnum(['current', 'draft']).optional(),
  attachments: z.custom<AttachmentInput | AttachmentInput[]>(),
});

export type CreateAttachment = z.input<typeof CreateAttachmentSchema>;
