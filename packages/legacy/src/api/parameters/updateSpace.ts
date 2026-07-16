import type { SpaceUpdate } from '../models/index.js';

export interface UpdateSpace extends SpaceUpdate {
  /** The key of the space to update. */
  spaceKey: string;
}
