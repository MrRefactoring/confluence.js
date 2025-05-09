import type { SpacePropertyCreate } from '../models';

export interface CreateSpaceProperty extends SpacePropertyCreate {
  /** The key of the space that the property will be created in. */
  spaceKey: string;
}
