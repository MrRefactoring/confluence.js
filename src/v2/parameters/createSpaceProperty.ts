import { z } from 'zod';
import { SpacePropertyCreateSchema } from '../models';

export const CreateSpacePropertySchema = z
  .object({
    /** The ID of the space for which space properties should be returned. */
    spaceId: z.number(),
  })
  .extend(SpacePropertyCreateSchema.shape);

export type CreateSpaceProperty = z.input<typeof CreateSpacePropertySchema>;
