import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { SpaceRoleSchema } from './spaceRole.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const AvailableSpaceRolesSchema = apiObject({
  results: z.array(SpaceRoleSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type AvailableSpaceRoles = z.infer<typeof AvailableSpaceRolesSchema>;
