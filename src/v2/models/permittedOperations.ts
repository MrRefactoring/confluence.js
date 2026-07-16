import { z } from 'zod';
import { apiObject } from '#/core';
import { OperationSchema } from './operation';
/** The list of operations permitted on entity. */

export const PermittedOperationsSchema = apiObject({
  operations: z.array(OperationSchema).optional(),
});

export type PermittedOperations = z.infer<typeof PermittedOperationsSchema>;
