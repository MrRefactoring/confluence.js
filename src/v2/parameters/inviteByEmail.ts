import { z } from 'zod';

export const InviteByEmailSchema = z.object({
  body: z.record(z.string(), z.any()).optional(),
});

export type InviteByEmail = z.input<typeof InviteByEmailSchema>;
