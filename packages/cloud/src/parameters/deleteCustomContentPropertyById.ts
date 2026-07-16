import { z } from 'zod';

export const DeleteCustomContentPropertyByIdSchema = z.object({
  /** The ID of the custom content the property belongs to. */
  customContentId: z.number(),
  /** The ID of the property to be deleted. */
  propertyId: z.number(),
});

export type DeleteCustomContentPropertyById = z.input<typeof DeleteCustomContentPropertyByIdSchema>;
