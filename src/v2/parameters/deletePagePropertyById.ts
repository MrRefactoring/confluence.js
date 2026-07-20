import { z } from 'zod';

export const DeletePagePropertyByIdSchema = z.object({
  /** The ID of the page the property belongs to. */
  pageId: z.number(),
  /** The ID of the property to be deleted. */
  propertyId: z.number(),
});

export type DeletePagePropertyById = z.input<typeof DeletePagePropertyByIdSchema>;
