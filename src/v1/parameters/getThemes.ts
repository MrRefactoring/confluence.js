import { z } from 'zod';

export const GetThemesSchema = z.object({
  /** The starting index of the returned themes. */
  start: z.number().optional(),
  /** The maximum number of themes to return per page. Note, this may be restricted by fixed system limits. */
  limit: z.number().optional(),
});

export type GetThemes = z.input<typeof GetThemesSchema>;
