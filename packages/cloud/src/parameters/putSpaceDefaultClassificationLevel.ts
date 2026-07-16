import { z } from 'zod';

export const PutSpaceDefaultClassificationLevelSchema = z.object({
  /** The ID of the space for which default classification level should be updated. */
  id: z.number(),
  body: z.record(z.string(), z.any()).optional(),
});

export type PutSpaceDefaultClassificationLevel = z.input<typeof PutSpaceDefaultClassificationLevelSchema>;
