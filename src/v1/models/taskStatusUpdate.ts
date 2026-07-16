import { z } from 'zod';
import { apiObject } from '#/core';

export const TaskStatusUpdateSchema = apiObject({
  status: z.enum(['complete', 'incomplete']),
});

export type TaskStatusUpdate = z.infer<typeof TaskStatusUpdateSchema>;
