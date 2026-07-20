import { z } from 'zod';

export const PostWhiteboardClassificationLevelSchema = z.object({
  /** The ID of the whiteboard for which classification level should be updated. */
  id: z.number(),
  body: z.record(z.string(), z.any()).optional(),
});

export type PostWhiteboardClassificationLevel = z.input<typeof PostWhiteboardClassificationLevelSchema>;
