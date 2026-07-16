import { z } from 'zod';

export const GetSmartLinkContentPropertiesByIdSchema = z.object({
  /** The ID of the Smart Link in the content tree for which content properties should be returned. */
  embedId: z.number(),
  /** The ID of the content property being requested. */
  propertyId: z.number(),
});

export type GetSmartLinkContentPropertiesById = z.input<typeof GetSmartLinkContentPropertiesByIdSchema>;
