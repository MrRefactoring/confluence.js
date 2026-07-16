import type { SpacePermissionCustomContent } from '../models/index.js';

export interface AddCustomContentPermissions extends SpacePermissionCustomContent {
  /** The key of the space to be queried for its content. */
  spaceKey: string;
}
