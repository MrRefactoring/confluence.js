import { z } from 'zod';
import { ContentPropertyCreateSchema } from '../models';

export const CreatePagePropertySchema = z.object({}).extend(ContentPropertyCreateSchema.shape).extend({
  /** The ID of the page to create a property for. */
  pageId: z.number(),
});

export type CreatePageProperty = z.input<typeof CreatePagePropertySchema>;
