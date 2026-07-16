import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const DeleteSpaceRoleResponseSchema = apiObject({
  /** Id of the task to update the space permissions associated with the space role */
  taskId: z.string().optional(),
});

export type DeleteSpaceRoleResponse = z.infer<typeof DeleteSpaceRoleResponseSchema>;
