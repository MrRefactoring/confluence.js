import { z } from 'zod';
import { LookAndFeelSchema } from '../models';

export const UpdateLookAndFeelSettingsSchema = z
  .object({
    /**
     * The key of the space for which the look and feel settings will be updated. If this is not set, the global look
     * and feel settings will be updated.
     */
    spaceKey: z.string().optional(),
  })
  .extend(LookAndFeelSchema.shape);

export type UpdateLookAndFeelSettings = z.input<typeof UpdateLookAndFeelSettingsSchema>;
