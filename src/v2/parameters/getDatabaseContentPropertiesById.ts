import { z } from 'zod';

export const GetDatabaseContentPropertiesByIdSchema = z.object({
  /** The ID of the database for which content properties should be returned. */
  databaseId: z.number(),
  /** The ID of the content property being requested. */
  propertyId: z.number(),
});

export type GetDatabaseContentPropertiesById = z.input<typeof GetDatabaseContentPropertiesByIdSchema>;
