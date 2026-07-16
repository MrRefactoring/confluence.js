import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { SpaceRoleAssignmentSchema } from './spaceRoleAssignment.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const SpaceRoleAssignmentsSetSchema = apiObject({
  results: z.array(SpaceRoleAssignmentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type SpaceRoleAssignmentsSet = z.infer<typeof SpaceRoleAssignmentsSetSchema>;
