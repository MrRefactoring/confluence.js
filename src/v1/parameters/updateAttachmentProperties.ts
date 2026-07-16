import { z } from 'zod';
import { AttachmentPropertiesUpdateBodySchema } from '../models';

export const UpdateAttachmentPropertiesSchema = z
  .object({
    /** The ID of the content that the attachment is attached to. */
    id: z.string(),
    /** The ID of the attachment to update. */
    attachmentId: z.string(),
  })
  .extend(AttachmentPropertiesUpdateBodySchema.shape);

export type UpdateAttachmentProperties = z.input<typeof UpdateAttachmentPropertiesSchema>;
