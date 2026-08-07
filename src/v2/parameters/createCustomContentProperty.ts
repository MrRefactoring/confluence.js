import { z } from 'zod';
import { ContentPropertyCreateSchema } from '../models';

export const CreateCustomContentPropertySchema = z.object({}).extend(ContentPropertyCreateSchema.shape).extend({
  /** The ID of the custom content to create a property for. */
  customContentId: z.number(),
});

export type CreateCustomContentProperty = z.input<typeof CreateCustomContentPropertySchema>;
