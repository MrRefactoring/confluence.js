import { z } from 'zod';
import { apiObject } from '#/core';
import { SpaceDescriptionCreateSchema } from './spaceDescriptionCreate';
import { SpacePermissionCreateSchema } from './spacePermissionCreate';
/** This is the request object used when creating a new space. */

export const SpaceCreateSchema = apiObject({
  /** The name of the new space. */
  name: z.string().max(200, 'name must be at most 200 characters'),
  /**
   * The key for the new space. Format: See [Space keys](https://confluence.atlassian.com/x/lqNMMQ). If `alias` is not
   * provided, this is required.
   */
  key: z.string().optional(),
  /**
   * This field will be used as the new identifier for the space in confluence page URLs. If the property is not
   * provided the alias will be the provided key. This property is experimental and may be changed or removed in the
   * future.
   */
  alias: z.string().optional(),
  description: SpaceDescriptionCreateSchema.optional(),
  /**
   * The permissions for the new space. If no permissions are provided, the [Confluence default space
   * permissions](https://confluence.atlassian.com/x/UAgzKw#CreateaSpace-Spacepermissions) are applied. Note that if
   * permissions are provided, the space is created with only the provided set of permissions, not including the
   * default space permissions. Space permissions can be modified after creation using the space permissions
   * endpoints, and a private space can be created using the create private space endpoint.
   */
  permissions: z.array(SpacePermissionCreateSchema).nullish(),
});

export type SpaceCreate = z.infer<typeof SpaceCreateSchema>;
