import { z } from 'zod';

export const CreateSpaceSchema = z.object({
  body: z.record(z.string(), z.any()).optional(),
});

export type CreateSpace = z.input<typeof CreateSpaceSchema>;
