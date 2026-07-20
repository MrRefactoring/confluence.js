import { z } from 'zod';

export const GetSpacePropertyByIdSchema = z.object({
  /** The ID of the space the property belongs to. */
  spaceId: z.number(),
  /** The ID of the property to be retrieved. */
  propertyId: z.number(),
});

export type GetSpacePropertyById = z.input<typeof GetSpacePropertyByIdSchema>;
