import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const GroupCreateSchema = apiObject({
  type: openEnum(['group']),
  id: z.string().optional(),
});

export type GroupCreate = z.infer<typeof GroupCreateSchema>;
