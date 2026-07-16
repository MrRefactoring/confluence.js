import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { OperationSchema } from '#/models/operation';
/** The list of operations permitted on entity. */

export const PermittedOperationsSchema = apiObject({
  operations: z.array(OperationSchema).nullish(),
});

export type PermittedOperations = z.infer<typeof PermittedOperationsSchema>;
