import { z } from 'zod';

export const DeleteSmartLinkPropertyByIdSchema = z.object({
  /** The ID of the Smart Link in the content tree the property belongs to. */
  embedId: z.number(),
  /** The ID of the property to be deleted. */
  propertyId: z.number(),
});

export type DeleteSmartLinkPropertyById = z.input<typeof DeleteSmartLinkPropertyByIdSchema>;
