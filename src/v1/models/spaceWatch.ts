import { z } from 'zod';
import { apiObject } from '#/core';
import { WatchUserSchema } from './watchUser';

export const SpaceWatchSchema = apiObject({
  type: z.string(),
  watcher: WatchUserSchema,
  spaceKey: z.string().optional(),
  labelName: z.string().optional(),
  prefix: z.string().optional(),
});

export type SpaceWatch = z.infer<typeof SpaceWatchSchema>;
