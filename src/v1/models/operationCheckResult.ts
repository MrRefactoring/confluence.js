import { z } from 'zod';
import { apiObject } from '#/core';
/** An operation and the target entity that it applies to, e.g. create page. */

export const OperationCheckResultSchema = apiObject({
  /** The operation itself. */
  operation: z.string(),
  /**
   * The space or content type that the operation applies to. Could be one of- - application - page - blogpost -
   * comment - attachment - space
   */
  targetType: z.string(),
});

export type OperationCheckResult = z.infer<typeof OperationCheckResultSchema>;
