import { z } from 'zod';
import { SpacePermissionRequestSchema } from '../models';

export const AddPermissionToSpaceSchema = z
  .object({
    /** The key of the space to be queried for its content. */
    spaceKey: z.string(),
  })
  .extend(SpacePermissionRequestSchema.shape);

export type AddPermissionToSpace = z.input<typeof AddPermissionToSpaceSchema>;
