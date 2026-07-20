import { z } from 'zod';
import { apiObject } from '#/core';
import { TaskSchema } from './task';

export const TaskPageResponseSchema = apiObject({
  results: z.array(TaskSchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
});

export type TaskPageResponse = z.infer<typeof TaskPageResponseSchema>;
