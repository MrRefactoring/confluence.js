import { z } from 'zod';

export const DeleteSpaceDefaultClassificationLevelSchema = z.object({
  /** The ID of the space for which default classification level should be deleted. */
  id: z.number(),
});

export type DeleteSpaceDefaultClassificationLevel = z.input<typeof DeleteSpaceDefaultClassificationLevelSchema>;
