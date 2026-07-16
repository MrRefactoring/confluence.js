import { z } from 'zod';

export const CheckAccessByEmailSchema = z.object({
  body: z.record(z.string(), z.any()).optional(),
});

export type CheckAccessByEmail = z.input<typeof CheckAccessByEmailSchema>;
