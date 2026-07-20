import { z } from 'zod';
import { apiObject } from '#/core';

export const ThemeUpdateSchema = apiObject({
  /** The key of the theme to be set as the space theme. */
  themeKey: z.string(),
});

export type ThemeUpdate = z.infer<typeof ThemeUpdateSchema>;
