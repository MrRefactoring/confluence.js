import { z } from 'zod';
import { ContentPropertyCreateSchema } from '../models';

export const CreateDatabasePropertySchema = z
  .object({
    /** The ID of the database to create a property for. */
    id: z.number(),
  })
  .extend(ContentPropertyCreateSchema.shape);

export type CreateDatabaseProperty = z.input<typeof CreateDatabasePropertySchema>;
