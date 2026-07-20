import { z } from 'zod';

export const GetSpaceDefaultClassificationLevelSchema = z.object({
  /** The ID of the space for which default classification level should be returned. */
  id: z.number(),
});

export type GetSpaceDefaultClassificationLevel = z.input<typeof GetSpaceDefaultClassificationLevelSchema>;
