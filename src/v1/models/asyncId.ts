import { z } from 'zod';
import { apiObject } from '#/core';

export const AsyncIdSchema = apiObject({
  asyncId: z.string(),
});

export type AsyncId = z.infer<typeof AsyncIdSchema>;
