import { z } from 'zod';
import { apiObject } from '#/core';
import { PrincipalSchema } from './principal';

export const SpaceRoleAssignmentSchema = apiObject({
  principal: PrincipalSchema.nullish(),
  /** The role to which the principal is assigned. */
  roleId: z.string().optional(),
});

export type SpaceRoleAssignment = z.infer<typeof SpaceRoleAssignmentSchema>;
