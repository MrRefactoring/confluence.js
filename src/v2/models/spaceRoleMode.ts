import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const SpaceRoleModeSchema = apiObject({
  /** The space role mode. */
  mode: openEnum(['PRE_ROLES', 'ROLES_TRANSITION', 'ROLES']).optional(),
});

export type SpaceRoleMode = z.infer<typeof SpaceRoleModeSchema>;
