import { z } from 'zod';
import { ContentPropertyUpdateSchema } from '../models';

export const UpdateDatabasePropertyByIdSchema = z.object({}).extend(ContentPropertyUpdateSchema.shape).extend({
  /** The ID of the database the property belongs to. */
  databaseId: z.number(),
  /** The ID of the property to be updated. */
  propertyId: z.number(),
});

export type UpdateDatabasePropertyById = z.input<typeof UpdateDatabasePropertyByIdSchema>;
