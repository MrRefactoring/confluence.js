import { SpacePermissionCustomContent } from '../models';

export interface AddCustomContentPermissions extends SpacePermissionCustomContent {
  /** The key of the space to be queried for its content. */
  spaceKey: string;
}
