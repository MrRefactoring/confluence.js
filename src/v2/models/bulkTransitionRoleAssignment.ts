import { z } from 'zod';
import { apiObject } from '#/core';
import { BulkTransitionPrincipalTypeAssignmentSchema } from './bulkTransitionPrincipalTypeAssignment';

export const BulkTransitionRoleAssignmentSchema = apiObject({
  /** The ID of the permission combination. */
  permissionCombinationId: z.string(),
  /** List of principal type assignments. */
  principalTypeAssignments: z.array(BulkTransitionPrincipalTypeAssignmentSchema),
});

export type BulkTransitionRoleAssignment = z.infer<typeof BulkTransitionRoleAssignmentSchema>;
