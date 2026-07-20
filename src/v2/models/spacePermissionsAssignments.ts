import { z } from 'zod';
import { apiObject } from '#/core';
import { SpacePermissionAssignmentSchema } from './spacePermissionAssignment';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const SpacePermissionsAssignmentsSchema = apiObject({
  results: z.array(SpacePermissionAssignmentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type SpacePermissionsAssignments = z.infer<typeof SpacePermissionsAssignmentsSchema>;
