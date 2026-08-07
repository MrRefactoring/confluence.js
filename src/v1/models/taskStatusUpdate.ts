import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const TaskStatusUpdateSchema = apiObject({
  status: openEnum(['complete', 'incomplete']),
});

export type TaskStatusUpdate = z.infer<typeof TaskStatusUpdateSchema>;
