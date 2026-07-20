import { z } from 'zod';
import { apiObject } from '#/core';
import { BulkTransitionRoleAssignmentSchema } from './bulkTransitionRoleAssignment';
import { BulkTransitionSpaceSelectionSchema } from './bulkTransitionSpaceSelection';

export const BulkAssignRolesSchema = apiObject({
  /** List of role assignments to apply. */
  assignments: z.array(BulkTransitionRoleAssignmentSchema),
  spaceSelection: BulkTransitionSpaceSelectionSchema,
});

export type BulkAssignRoles = z.infer<typeof BulkAssignRolesSchema>;
