import { SpaceUpdate } from '../models';

export interface UpdateSpace extends SpaceUpdate {
  /** The key of the space to update. */
  spaceKey: string;
}
