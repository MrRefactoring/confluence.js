import { z } from 'zod';
import { SpaceUpdateSchema } from '../models';

export const UpdateSpaceSchema = z.object({}).extend(SpaceUpdateSchema.shape).extend({
  /** The key of the space to update. */
  spaceKey: z.string(),
});

export type UpdateSpace = z.input<typeof UpdateSpaceSchema>;
