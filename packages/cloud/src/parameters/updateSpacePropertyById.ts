import { z } from 'zod';
import { SpacePropertyUpdateSchema } from '../models/index.js';

export const UpdateSpacePropertyByIdSchema = z
  .object({
    /** The ID of the space the property belongs to. */
    spaceId: z.number(),
    /** The ID of the property to be updated. */
    propertyId: z.number(),
  })
  .extend(SpacePropertyUpdateSchema.shape);

export type UpdateSpacePropertyById = z.input<typeof UpdateSpacePropertyByIdSchema>;
