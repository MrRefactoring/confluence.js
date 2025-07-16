import type { SpaceDescriptionCreate } from './spaceDescriptionCreate';
import type { SpacePermission } from './spacePermission';

/** This is the request object used when creating a new space. */
export interface SpaceCreate {
  /** The name of the new space. */
  name: string;
  /**
   * The key for the new space. Format: See [Space keys](https://confluence.atlassian.com/x/lqNMMQ). If `alias` is not
   * provided, this is required.
   */
  key?: string;
  /**
   * This field will be used as the new identifier for the space in confluence page URLs. If the property is not
   * provided the alias will be the provided key. This property is experimental and may be changed or removed in the
   * future.
   */
  alias?: string;
  description?: SpaceDescriptionCreate;
  /**
   * The permissions for the new space. If no permissions are provided, the [Confluence default space
   * permissions](https://confluence.atlassian.com/x/UAgzKw#CreateaSpace-Spacepermissions) are applied. Note that if
   * permissions are provided, the space is created with only the provided set of permissions, not including the default
   * space permissions. Space permissions can be modified after creation using the space permissions endpoints, and a
   * private space can be created using the create private space endpoint.
   */
  permissions?: SpacePermission[];
}
