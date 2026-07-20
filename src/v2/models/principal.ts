import { z } from 'zod';
import { apiObject } from '#/core';
import { PrincipalTypeSchema } from './principalType';
/** The principal of the role assignment. */

export const PrincipalSchema = apiObject({
  principalType: PrincipalTypeSchema.optional(),
  /** The principal ID. */
  principalId: z.string().optional(),
});

export type Principal = z.infer<typeof PrincipalSchema>;
