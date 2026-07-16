import { z } from 'zod';
import { ContentPropertyUpdateSchema } from '../models/index.js';

export const UpdateAttachmentPropertyByIdSchema = z
  .object({
    /** The ID of the attachment the property belongs to. */
    attachmentId: z.string(),
    /** The ID of the property to be updated. */
    propertyId: z.number(),
  })
  .extend(ContentPropertyUpdateSchema.shape);

export type UpdateAttachmentPropertyById = z.input<typeof UpdateAttachmentPropertyByIdSchema>;
