import { z } from 'zod';
import { apiObject } from '#/core';

export const BulkTransitionTaskSchema = apiObject({
  /** The ID of the async task. */
  taskId: z.string(),
  /** The current status of the task. */
  status: z.enum(['IN_PROGRESS', 'COMPLETED', 'FAILED']),
  /** URL to poll for task progress. */
  statusUrl: z.string(),
});

export type BulkTransitionTask = z.infer<typeof BulkTransitionTaskSchema>;
