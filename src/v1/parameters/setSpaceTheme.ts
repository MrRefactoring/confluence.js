import { z } from 'zod';
import { ThemeUpdateSchema } from '../models';

export const SetSpaceThemeSchema = z.object({}).extend(ThemeUpdateSchema.shape).extend({
  /** The key of the space to set the theme for. */
  spaceKey: z.string(),
});

export type SetSpaceTheme = z.input<typeof SetSpaceThemeSchema>;
