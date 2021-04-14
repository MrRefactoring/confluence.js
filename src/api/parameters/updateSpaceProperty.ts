import { SpacePropertyUpdate } from '../models';

export interface UpdateSpaceProperty extends SpacePropertyUpdate {
  /** The key of the space that the property is in. */
  spaceKey: string;
  /** The key of the property to be updated. */
  key: string;
}
