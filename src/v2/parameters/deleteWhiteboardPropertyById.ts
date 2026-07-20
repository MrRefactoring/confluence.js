import { z } from 'zod';

export const DeleteWhiteboardPropertyByIdSchema = z.object({
  /** The ID of the whiteboard the property belongs to. */
  whiteboardId: z.number(),
  /** The ID of the property to be deleted. */
  propertyId: z.number(),
});

export type DeleteWhiteboardPropertyById = z.input<typeof DeleteWhiteboardPropertyByIdSchema>;
