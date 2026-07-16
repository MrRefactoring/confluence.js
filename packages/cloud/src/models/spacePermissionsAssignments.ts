import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { SpacePermissionAssignmentSchema } from './spacePermissionAssignment.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const SpacePermissionsAssignmentsSchema = apiObject({
  results: z.array(SpacePermissionAssignmentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type SpacePermissionsAssignments = z.infer<typeof SpacePermissionsAssignmentsSchema>;
