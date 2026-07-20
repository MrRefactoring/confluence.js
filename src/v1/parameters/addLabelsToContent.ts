import { z } from 'zod';
import { LabelCreateArraySchema } from '../models';
import { LabelCreateSchema } from '../models';

export const AddLabelsToContentSchema = z.object({
  /** The ID of the content that will have labels added to it. */
  id: z.string(),
  body: z.union([LabelCreateArraySchema, LabelCreateSchema]),
});

export type AddLabelsToContent = z.input<typeof AddLabelsToContentSchema>;
