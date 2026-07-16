import { z } from 'zod';

export const ResetSpaceThemeSchema = z.object({
  /** The key of the space to reset the theme for. */
  spaceKey: z.string(),
});

export type ResetSpaceTheme = z.input<typeof ResetSpaceThemeSchema>;
