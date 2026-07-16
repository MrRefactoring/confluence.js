import { z } from 'zod';

export const DeleteDatabasePropertyByIdSchema = z.object({
  /** The ID of the database the property belongs to. */
  databaseId: z.number(),
  /** The ID of the property to be deleted. */
  propertyId: z.number(),
});

export type DeleteDatabasePropertyById = z.input<typeof DeleteDatabasePropertyByIdSchema>;
