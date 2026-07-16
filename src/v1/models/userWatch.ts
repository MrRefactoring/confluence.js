import { z } from 'zod';
import { apiObject } from '#/core';

export const UserWatchSchema = apiObject({
  watching: z.boolean(),
});

export type UserWatch = z.infer<typeof UserWatchSchema>;
