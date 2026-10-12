import { z } from 'zod';
import { LabelCreateSchema } from '../models';

export const AddLabelsToSpaceSchema = z.object({
  /** The key of the space to add labels to. */
  spaceKey: z.string(),
  body: z.union([z.array(LabelCreateSchema), z.record(z.string(), z.any())]),
});

export type AddLabelsToSpace = z.input<typeof AddLabelsToSpaceSchema>;
