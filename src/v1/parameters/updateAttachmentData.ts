import { z } from 'zod';
import type { AttachmentInput } from '#/core';

export const UpdateAttachmentDataSchema = z.object({
  /** The ID of the content that the attachment is attached to. */
  id: z.string(),
  /** The ID of the attachment to update. */
  attachmentId: z.string(),
  attachment: z.custom<
    | (AttachmentInput & {
      minorEdit?: boolean;
      comment?: string;
    })
    | (AttachmentInput & {
      minorEdit?: boolean;
      comment?: string;
    })[]
  >(),
});

export type UpdateAttachmentData = z.input<typeof UpdateAttachmentDataSchema>;
