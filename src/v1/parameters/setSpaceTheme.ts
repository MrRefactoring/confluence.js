import { z } from 'zod';
import { ThemeUpdateSchema } from '../models';

export const SetSpaceThemeSchema = z
  .object({
    /** The key of the space to set the theme for. */
    spaceKey: z.string(),
  })
  .extend(ThemeUpdateSchema.shape);

export type SetSpaceTheme = z.input<typeof SetSpaceThemeSchema>;
