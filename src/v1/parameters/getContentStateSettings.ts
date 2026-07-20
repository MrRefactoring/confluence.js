import { z } from 'zod';

export const GetContentStateSettingsSchema = z.object({
  /** The key of the space to be queried for its content state settings. */
  spaceKey: z.string(),
});

export type GetContentStateSettings = z.input<typeof GetContentStateSettingsSchema>;
