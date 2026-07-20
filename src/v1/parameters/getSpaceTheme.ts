import { z } from 'zod';

export const GetSpaceThemeSchema = z.object({
  /** The key of the space to be queried for its theme. */
  spaceKey: z.string(),
});

export type GetSpaceTheme = z.input<typeof GetSpaceThemeSchema>;
