import type { z } from 'zod';
import { openEnum } from '#/core';
/** The role type. */

export const RoleTypeSchema = openEnum(['SYSTEM', 'CUSTOM']);

export type RoleType = z.infer<typeof RoleTypeSchema>;
