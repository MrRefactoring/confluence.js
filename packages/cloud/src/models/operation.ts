import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const OperationSchema = apiObject({
  /** The type of operation. */
  operation: z.string().optional(),
  /** The type of entity the operation type targets. */
  targetType: z.string().optional(),
});

export type Operation = z.infer<typeof OperationSchema>;
