import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { PrincipalTypeSchema } from '#/models/principalType';
/** The principal of the role assignment. */

export const PrincipalSchema = apiObject({
  principalType: PrincipalTypeSchema.optional(),
  /** The principal ID. */
  principalId: z.string().optional(),
});

export type Principal = z.infer<typeof PrincipalSchema>;
