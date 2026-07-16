import type { SpaceWatchUser } from './spaceWatchUser.js';

export interface SpaceWatch {
  type: string;
  watcher: SpaceWatchUser;
  contentId?: string;
  spaceKey: string;
}
