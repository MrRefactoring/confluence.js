import { z } from 'zod';
import { ContentPropertyCreateSchema } from '../models';

export const CreateFolderPropertySchema = z
  .object({
    /** The ID of the folder to create a property for. */
    id: z.number(),
  })
  .extend(ContentPropertyCreateSchema.shape);

export type CreateFolderProperty = z.input<typeof CreateFolderPropertySchema>;
