export interface CreateSpace {
  /** The key for the new space. Format: See [Space keys](https://confluence.atlassian.com/x/lqNMMQ). */
  key: string;
  /** The name of the new space. */
  name: string;
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
