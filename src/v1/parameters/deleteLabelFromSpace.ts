import { z } from 'zod';

export const DeleteLabelFromSpaceSchema = z.object({
  /** The key of the space to remove a labels from. */
  spaceKey: z.string(),
  /** The name of the label to remove */
  name: z.string(),
  /** The prefix of the label to remove. If not provided defaults to global. */
  prefix: z.string().optional(),
});

export type DeleteLabelFromSpace = z.input<typeof DeleteLabelFromSpaceSchema>;
