import { z } from 'zod';
import { apiObject } from '#/core';

export const BulkTransitionSpaceTargetSchema = apiObject({
  /** The space ID. */
  id: z.string(),
  /** The space key. */
  key: z.string(),
});

export type BulkTransitionSpaceTarget = z.infer<typeof BulkTransitionSpaceTargetSchema>;
