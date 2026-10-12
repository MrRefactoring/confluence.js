import { z } from 'zod';
import { SpacePropertyUpdateSchema } from '../models';

export const UpdateSpacePropertyByIdSchema = z.object(SpacePropertyUpdateSchema.shape).extend({
  /** The ID of the space the property belongs to. */
  spaceId: z.number(),
  /** The ID of the property to be updated. */
  propertyId: z.number(),
});

export type UpdateSpacePropertyById = z.input<typeof UpdateSpacePropertyByIdSchema>;
