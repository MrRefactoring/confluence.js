import { z } from 'zod';
import { ContentPropertyCreateSchema } from '../models';

export const CreateFolderPropertySchema = z.object({}).extend(ContentPropertyCreateSchema.shape).extend({
  /** The ID of the folder to create a property for. */
  id: z.number(),
});

export type CreateFolderProperty = z.input<typeof CreateFolderPropertySchema>;
