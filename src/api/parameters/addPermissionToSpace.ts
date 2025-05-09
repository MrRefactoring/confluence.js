import type { SpacePermissionRequest } from '../models';

export interface AddPermissionToSpace extends SpacePermissionRequest {
  /** The key of the space to be queried for its content. */
  spaceKey: string;
}
