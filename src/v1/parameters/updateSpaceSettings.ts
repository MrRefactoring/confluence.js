import { z } from 'zod';
import { SpaceSettingsUpdateSchema } from '../models';

export const UpdateSpaceSettingsSchema = z
  .object({
    /** The key of the space whose settings will be updated. */
    spaceKey: z.string(),
  })
  .extend(SpaceSettingsUpdateSchema.shape);

export type UpdateSpaceSettings = z.input<typeof UpdateSpaceSettingsSchema>;
