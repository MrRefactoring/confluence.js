import { z } from 'zod';
import { apiObject } from '#/core';
import { RoleTypeSchema } from './roleType';

export const SpaceRoleSchema = apiObject({
  /** The identifier for the space role. */
  id: z.string().optional(),
  type: RoleTypeSchema.optional(),
  /** The name for the space role. */
  name: z.string().optional(),
  /** The description for the space role’s usage. */
  description: z.string().optional(),
  /** The space permissions the space role is comprised of. */
  spacePermissions: z.array(z.string()).optional(),
});

export type SpaceRole = z.infer<typeof SpaceRoleSchema>;
