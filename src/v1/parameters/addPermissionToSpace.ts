import { z } from 'zod';
import { SpacePermissionRequestSchema } from '../models';

export const AddPermissionToSpaceSchema = z.object({}).extend(SpacePermissionRequestSchema.shape).extend({
  /** The key of the space to be queried for its content. */
  spaceKey: z.string(),
});

export type AddPermissionToSpace = z.input<typeof AddPermissionToSpaceSchema>;
