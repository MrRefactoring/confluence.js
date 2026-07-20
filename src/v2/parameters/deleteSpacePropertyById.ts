import { z } from 'zod';

export const DeleteSpacePropertyByIdSchema = z.object({
  /** The ID of the space the property belongs to. */
  spaceId: z.number(),
  /** The ID of the property to be deleted. */
  propertyId: z.number(),
});

export type DeleteSpacePropertyById = z.input<typeof DeleteSpacePropertyByIdSchema>;
