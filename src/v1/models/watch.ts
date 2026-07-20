import { z } from 'zod';
import { apiObject } from '#/core';
import { WatchUserSchema } from './watchUser';

export const WatchSchema = apiObject({
  type: z.string(),
  watcher: WatchUserSchema,
  contentId: z.number(),
});

export type Watch = z.infer<typeof WatchSchema>;
