import { z } from 'zod';
import { ContentPropertyUpdateSchema } from '../models';

export const UpdateAttachmentPropertyByIdSchema = z.object({}).extend(ContentPropertyUpdateSchema.shape).extend({
  /** The ID of the attachment the property belongs to. */
  attachmentId: z.string(),
  /** The ID of the property to be updated. */
  propertyId: z.number(),
});

export type UpdateAttachmentPropertyById = z.input<typeof UpdateAttachmentPropertyByIdSchema>;
