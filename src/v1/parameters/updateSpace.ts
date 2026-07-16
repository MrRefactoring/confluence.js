import { z } from 'zod';
import { SpaceUpdateSchema } from '../models';

export const UpdateSpaceSchema = z
  .object({
    /** The key of the space to update. */
    spaceKey: z.string(),
  })
  .extend(SpaceUpdateSchema.shape);

export type UpdateSpace = z.input<typeof UpdateSpaceSchema>;
