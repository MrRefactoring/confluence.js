import { z } from 'zod';

export const EnableAdminKeySchema = z.object({
  body: z.record(z.string(), z.any()).optional(),
});

export type EnableAdminKey = z.input<typeof EnableAdminKeySchema>;
