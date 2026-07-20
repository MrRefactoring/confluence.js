import { z } from 'zod';
import { SpacePermissionCustomContentSchema } from '../models';

export const AddCustomContentPermissionsSchema = z
  .object({
    /** The key of the space to be queried for its content. */
    spaceKey: z.string(),
  })
  .extend(SpacePermissionCustomContentSchema.shape);

export type AddCustomContentPermissions = z.input<typeof AddCustomContentPermissionsSchema>;
