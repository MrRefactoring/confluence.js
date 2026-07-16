import { z } from 'zod';

export const AddLabelsToContentSchema = z.object({
  /** The ID of the content that will have labels added to it. */
  id: z.string(),
  body: z.record(z.string(), z.any()),
});

export type AddLabelsToContent = z.input<typeof AddLabelsToContentSchema>;
