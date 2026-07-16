import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { BulkTransitionRoleAssignmentSchema } from '#/models/bulkTransitionRoleAssignment';
import { BulkTransitionSpaceSelectionSchema } from '#/models/bulkTransitionSpaceSelection';

export const BulkAssignRolesSchema = apiObject({
  /** List of role assignments to apply. */
  assignments: z.array(BulkTransitionRoleAssignmentSchema),
  spaceSelection: BulkTransitionSpaceSelectionSchema,
});

export type BulkAssignRoles = z.infer<typeof BulkAssignRolesSchema>;
