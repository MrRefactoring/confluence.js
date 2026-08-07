import type { z } from 'zod';
import { openEnum } from '#/core';
/** The principal type. */

export const PrincipalTypeSchema = openEnum(['USER', 'GROUP', 'ACCESS_CLASS']);

export type PrincipalType = z.infer<typeof PrincipalTypeSchema>;
