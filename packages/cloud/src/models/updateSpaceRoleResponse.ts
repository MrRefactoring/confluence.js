import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { RoleTypeSchema } from '#/models/roleType';

export const UpdateSpaceRoleResponseSchema = apiObject({
  /** Id of the space role */
  id: z.string().optional(),
  type: RoleTypeSchema.optional(),
  /** Name of the space role */
  name: z.string().optional(),
  /** Description for the space role */
  description: z.string().optional(),
  /** Id of the task to update the space permissions associated with the space role */
  taskId: z.string().optional(),
});

export type UpdateSpaceRoleResponse = z.infer<typeof UpdateSpaceRoleResponseSchema>;
