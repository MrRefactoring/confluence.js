import { SpacePermissionV2 } from '../models';

export interface AddPermission extends SpacePermissionV2 {
  /** The key of the space to be queried for its content. */
  spaceKey: string;
}
