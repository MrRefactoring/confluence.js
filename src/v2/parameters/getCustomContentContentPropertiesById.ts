import { z } from 'zod';

export const GetCustomContentContentPropertiesByIdSchema = z.object({
  /** The ID of the custom content for which content properties should be returned. */
  customContentId: z.number(),
  /** The ID of the content property being requested. */
  propertyId: z.number(),
});

export type GetCustomContentContentPropertiesById = z.input<typeof GetCustomContentContentPropertiesByIdSchema>;
