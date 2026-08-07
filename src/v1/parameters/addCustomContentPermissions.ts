import { z } from 'zod';
import { SpacePermissionCustomContentSchema } from '../models';

export const AddCustomContentPermissionsSchema = z.object({}).extend(SpacePermissionCustomContentSchema.shape).extend({
  /** The key of the space to be queried for its content. */
  spaceKey: z.string(),
});

export type AddCustomContentPermissions = z.input<typeof AddCustomContentPermissionsSchema>;
