import { z } from 'zod';
import { ContentPropertyCreateSchema } from '../models';

export const CreateDatabasePropertySchema = z.object({}).extend(ContentPropertyCreateSchema.shape).extend({
  /** The ID of the database to create a property for. */
  id: z.number(),
});

export type CreateDatabaseProperty = z.input<typeof CreateDatabasePropertySchema>;
