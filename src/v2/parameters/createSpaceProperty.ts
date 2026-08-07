import { z } from 'zod';
import { SpacePropertyCreateSchema } from '../models';

export const CreateSpacePropertySchema = z.object({}).extend(SpacePropertyCreateSchema.shape).extend({
  /** The ID of the space for which space properties should be returned. */
  spaceId: z.number(),
});

export type CreateSpaceProperty = z.input<typeof CreateSpacePropertySchema>;
