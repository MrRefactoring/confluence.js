import { z } from 'zod';

export const CreateWhiteboardSchema = z.object({
  /**
   * The whiteboard will be private. Only the user who creates this whiteboard will have permission to view and edit
   * one.
   */
  private: z.boolean().optional(),
  body: z.record(z.string(), z.any()).optional(),
});

export type CreateWhiteboard = z.input<typeof CreateWhiteboardSchema>;
