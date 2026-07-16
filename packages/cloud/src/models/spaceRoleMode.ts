import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const SpaceRoleModeSchema = apiObject({
  /** The space role mode. */
  mode: z.enum(['PRE_ROLES', 'ROLES_TRANSITION', 'ROLES']).optional(),
});

export type SpaceRoleMode = z.infer<typeof SpaceRoleModeSchema>;
