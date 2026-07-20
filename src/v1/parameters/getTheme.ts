import { z } from 'zod';

export const GetThemeSchema = z.object({
  /** The key of the theme to be returned. */
  themeKey: z.string(),
});

export type GetTheme = z.input<typeof GetThemeSchema>;
