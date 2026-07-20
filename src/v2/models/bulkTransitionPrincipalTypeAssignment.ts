import { z } from 'zod';
import { apiObject } from '#/core';

export const BulkTransitionPrincipalTypeAssignmentSchema = apiObject({
  /** The type of principal. */
  principalType: z.enum([
    'USER',
    'GROUP',
    'GUEST',
    'ANONYMOUS',
    'ALL_LICENSED_USERS_USER_CLASS',
    'ALL_PRODUCT_ADMINS_USER_CLASS',
    'APP',
  ]),
  /** Whether to remove access for this principal type instead of assigning a role. */
  removeAccess: z.boolean(),
  /** The UUID of the space role to assign. Required when removeAccess is false. */
  roleId: z.string().nullish(),
});

export type BulkTransitionPrincipalTypeAssignment = z.infer<typeof BulkTransitionPrincipalTypeAssignmentSchema>;
