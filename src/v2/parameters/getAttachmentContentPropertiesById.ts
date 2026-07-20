import { z } from 'zod';

export const GetAttachmentContentPropertiesByIdSchema = z.object({
  /** The ID of the attachment for which content properties should be returned. */
  attachmentId: z.string(),
  /** The ID of the content property to be returned */
  propertyId: z.number(),
});

export type GetAttachmentContentPropertiesById = z.input<typeof GetAttachmentContentPropertiesByIdSchema>;
