import { z } from 'zod';
import { ContentPropertyCreateSchema } from '../models';

export const CreateAttachmentPropertySchema = z.object({}).extend(ContentPropertyCreateSchema.shape).extend({
  /** The ID of the attachment to create a property for. */
  attachmentId: z.string(),
});

export type CreateAttachmentProperty = z.input<typeof CreateAttachmentPropertySchema>;
