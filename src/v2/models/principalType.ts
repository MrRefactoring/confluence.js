import { z } from 'zod';
/** The principal type. */

export const PrincipalTypeSchema = z.enum(['USER', 'GROUP', 'ACCESS_CLASS']);

export type PrincipalType = z.infer<typeof PrincipalTypeSchema>;
