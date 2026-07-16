import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { SpaceRoleAssignmentSchema } from './spaceRoleAssignment.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const SpaceRoleAssignmentsGetSchema = apiObject({
  results: z.array(SpaceRoleAssignmentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type SpaceRoleAssignmentsGet = z.infer<typeof SpaceRoleAssignmentsGetSchema>;
