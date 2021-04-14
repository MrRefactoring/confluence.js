import { SpaceWatchUser } from './spaceWatchUser';

export interface SpaceWatch {
  type: string;
  watcher: SpaceWatchUser;
  contentId?: string;
  spaceKey: string;
}
