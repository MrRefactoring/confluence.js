import { z } from 'zod';
import { apiObject } from '#/core';
import { SpaceRoleAssignmentSchema } from './spaceRoleAssignment';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const SpaceRoleAssignmentsGetSchema = apiObject({
  results: z.array(SpaceRoleAssignmentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type SpaceRoleAssignmentsGet = z.infer<typeof SpaceRoleAssignmentsGetSchema>;
