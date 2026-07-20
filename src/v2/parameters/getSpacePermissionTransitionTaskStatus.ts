import { z } from 'zod';

export const GetSpacePermissionTransitionTaskStatusSchema = z.object({
  /** The ID of the async task, as returned by the generate-combinations, assign-roles, or remove-access endpoints. */
  taskId: z.string(),
});

export type GetSpacePermissionTransitionTaskStatus = z.input<typeof GetSpacePermissionTransitionTaskStatusSchema>;
