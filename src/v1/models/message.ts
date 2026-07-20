import { z } from 'zod';
import { apiObject } from '#/core';

export const MessageSchema = apiObject({
  translation: z.string().optional(),
  args: z.array(z.union([z.string(), z.record(z.string(), z.any())])),
});

export type Message = z.infer<typeof MessageSchema>;
