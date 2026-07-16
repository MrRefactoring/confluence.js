import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const BulkTransitionTaskStatusSchema = apiObject({
  /** The ID of the task. */
  taskId: z.string(),
  /** The current status of the task. */
  status: z.enum(['IN_PROGRESS', 'COMPLETED', 'FAILED']),
  /** Human-readable error message describing why the task failed. Only present when status is FAILED. */
  errorMessage: z.string().nullish(),
});

export type BulkTransitionTaskStatus = z.infer<typeof BulkTransitionTaskStatusSchema>;
