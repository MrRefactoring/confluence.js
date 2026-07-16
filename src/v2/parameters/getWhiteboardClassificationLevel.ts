import { z } from 'zod';

export const GetWhiteboardClassificationLevelSchema = z.object({
  /** The ID of the whiteboard for which classification level should be returned. */
  id: z.number(),
});

export type GetWhiteboardClassificationLevel = z.input<typeof GetWhiteboardClassificationLevelSchema>;
