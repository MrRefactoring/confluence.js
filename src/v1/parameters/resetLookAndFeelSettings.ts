import { z } from 'zod';

export const ResetLookAndFeelSettingsSchema = z.object({
  /**
   * The key of the space for which the look and feel settings will be reset. If this is not set, the global look and
   * feel settings will be reset.
   */
  spaceKey: z.string().optional(),
});

export type ResetLookAndFeelSettings = z.input<typeof ResetLookAndFeelSettingsSchema>;
