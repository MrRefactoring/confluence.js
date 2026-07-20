import { z } from 'zod';

export const GetLookAndFeelSettingsSchema = z.object({
  /**
   * The key of the space for which the look and feel settings will be returned. If this is not set, only the global
   * look and feel settings are returned.
   */
  spaceKey: z.string().optional(),
});

export type GetLookAndFeelSettings = z.input<typeof GetLookAndFeelSettingsSchema>;
