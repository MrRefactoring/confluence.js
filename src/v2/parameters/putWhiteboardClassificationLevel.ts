import { z } from 'zod';

export const PutWhiteboardClassificationLevelSchema = z.object({
  /** The ID of the whiteboard for which classification level should be updated. */
  id: z.number(),
  body: z.record(z.string(), z.any()).optional(),
});

export type PutWhiteboardClassificationLevel = z.input<typeof PutWhiteboardClassificationLevelSchema>;
