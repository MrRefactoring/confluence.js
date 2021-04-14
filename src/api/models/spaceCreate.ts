import { SpaceDescriptionCreate } from './spaceDescriptionCreate';
import { SpacePermission } from './spacePermission';

/**
 * This is the request object used when creating a new space. */
export interface SpaceCreate {
  /** The key for the new space. Format: See [Space
   keys](https://confluence.atlassian.com/x/lqNMMQ). */
  key: string;
  /** The name of the new space. */
  name: string;
  /**
   * The description of the new/updated space. Note, only the 'plain' representation can be used for the description
   * when creating or updating a space.
   */
  description?: SpaceDescriptionCreate;
  /** The permissions for the new space. If no permissions are provided, the
   [Confluence default space permissions](https://confluence.atlassian.com/x/UAgzKw#CreateaSpace-Spacepermissions)
   are applied. Note that if permissions are provided, the space is
   created with only the provided set of permissions, not
   including the default space permissions. Space permissions
   can be modified after creation using the space permissions
   endpoints, and a private space can be created using the
   create private space endpoint. */
  permissions?: SpacePermission[];
}
