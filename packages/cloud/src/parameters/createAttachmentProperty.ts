import { z } from 'zod';
import { ContentPropertyCreateSchema } from '../models/index.js';

export const CreateAttachmentPropertySchema = z
  .object({
    /** The ID of the attachment to create a property for. */
    attachmentId: z.string(),
  })
  .extend(ContentPropertyCreateSchema.shape);

export type CreateAttachmentProperty = z.input<typeof CreateAttachmentPropertySchema>;
