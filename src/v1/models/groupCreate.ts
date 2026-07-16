import { z } from 'zod';
import { apiObject } from '#/core';

export const GroupCreateSchema = apiObject({
  type: z.enum(['group']),
  id: z.string().optional(),
});

export type GroupCreate = z.infer<typeof GroupCreateSchema>;
