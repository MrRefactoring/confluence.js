import { z } from 'zod';
import { apiObject } from '#/core';
import { IconSchema } from './icon';
/** Theme object without links. Used in ThemeArray. */

export const ThemeNoLinksSchema = apiObject({
  themeKey: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  icon: IconSchema.optional(),
});

export type ThemeNoLinks = z.infer<typeof ThemeNoLinksSchema>;
