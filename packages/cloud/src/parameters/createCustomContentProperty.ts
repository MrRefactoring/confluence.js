import { z } from 'zod';
import { ContentPropertyCreateSchema } from '../models/index.js';

export const CreateCustomContentPropertySchema = z
  .object({
    /** The ID of the custom content to create a property for. */
    customContentId: z.number(),
  })
  .extend(ContentPropertyCreateSchema.shape);

export type CreateCustomContentProperty = z.input<typeof CreateCustomContentPropertySchema>;
