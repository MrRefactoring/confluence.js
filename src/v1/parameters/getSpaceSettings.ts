import { z } from 'zod';

export const GetSpaceSettingsSchema = z.object({
  /** The key of the space to be queried for its settings. */
  spaceKey: z.string(),
});

export type GetSpaceSettings = z.input<typeof GetSpaceSettingsSchema>;
