import { z } from 'zod';
import { apiObject } from '#/core';
import { SpaceRoleSchema } from './spaceRole';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const AvailableSpaceRolesSchema = apiObject({
  results: z.array(SpaceRoleSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type AvailableSpaceRoles = z.infer<typeof AvailableSpaceRolesSchema>;
