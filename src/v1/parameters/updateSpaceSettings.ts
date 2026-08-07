import { z } from 'zod';
import { SpaceSettingsUpdateSchema } from '../models';

export const UpdateSpaceSettingsSchema = z.object({}).extend(SpaceSettingsUpdateSchema.shape).extend({
  /** The key of the space whose settings will be updated. */
  spaceKey: z.string(),
});

export type UpdateSpaceSettings = z.input<typeof UpdateSpaceSettingsSchema>;
