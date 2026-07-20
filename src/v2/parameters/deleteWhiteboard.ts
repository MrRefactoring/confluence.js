import { z } from 'zod';

export const DeleteWhiteboardSchema = z.object({
  /** The ID of the whiteboard to be deleted. */
  id: z.number(),
});

export type DeleteWhiteboard = z.input<typeof DeleteWhiteboardSchema>;
