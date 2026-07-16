import { z } from 'zod';

export const CreateSmartLinkSchema = z.object({
  body: z.record(z.string(), z.any()).optional(),
});

export type CreateSmartLink = z.input<typeof CreateSmartLinkSchema>;
