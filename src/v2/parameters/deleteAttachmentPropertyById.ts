import { z } from 'zod';

export const DeleteAttachmentPropertyByIdSchema = z.object({
  /** The ID of the attachment the property belongs to. */
  attachmentId: z.string(),
  /** The ID of the property to be deleted. */
  propertyId: z.number(),
});

export type DeleteAttachmentPropertyById = z.input<typeof DeleteAttachmentPropertyByIdSchema>;
