import { z } from 'zod';

export const RemoveLabelFromContentSchema = z.object({
  /** The ID of the content that the label will be removed from. */
  id: z.string(),
  /** The name of the label to be removed. */
  label: z.string(),
});

export type RemoveLabelFromContent = z.input<typeof RemoveLabelFromContentSchema>;
