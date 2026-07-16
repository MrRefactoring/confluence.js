import { z } from 'zod';
import { ContentPropertyCreateSchema } from '../models/index.js';

export const CreatePagePropertySchema = z
  .object({
    /** The ID of the page to create a property for. */
    pageId: z.number(),
  })
  .extend(ContentPropertyCreateSchema.shape);

export type CreatePageProperty = z.input<typeof CreatePagePropertySchema>;
