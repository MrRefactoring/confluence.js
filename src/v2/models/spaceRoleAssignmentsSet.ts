import { z } from 'zod';
import { apiObject } from '#/core';
import { SpaceRoleAssignmentSchema } from './spaceRoleAssignment';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const SpaceRoleAssignmentsSetSchema = apiObject({
  results: z.array(SpaceRoleAssignmentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type SpaceRoleAssignmentsSet = z.infer<typeof SpaceRoleAssignmentsSetSchema>;
