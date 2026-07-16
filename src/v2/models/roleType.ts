import { z } from 'zod';
/** The role type. */

export const RoleTypeSchema = z.enum(['SYSTEM', 'CUSTOM']);

export type RoleType = z.infer<typeof RoleTypeSchema>;
