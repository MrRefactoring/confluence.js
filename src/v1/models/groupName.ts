import { z } from 'zod';
import { apiObject } from '#/core';

export const GroupNameSchema = apiObject({
  name: z.string(),
});

export type GroupName = z.infer<typeof GroupNameSchema>;
