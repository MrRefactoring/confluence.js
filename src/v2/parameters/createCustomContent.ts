import { z } from 'zod';

export const CreateCustomContentSchema = z.object({
  body: z.record(z.string(), z.any()).optional(),
});

export type CreateCustomContent = z.input<typeof CreateCustomContentSchema>;
