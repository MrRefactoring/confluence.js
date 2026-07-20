import { z } from 'zod';
import { apiObject } from '#/core';

export const MessageSchema = apiObject({
  translation: z.string().optional(),
  args: z.array(z.union([z.string(), z.record(z.string(), z.any())])),
  key: z.string().optional(),
});

export type Message = z.infer<typeof MessageSchema>;
