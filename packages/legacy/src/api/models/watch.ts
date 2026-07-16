import type { WatchUser } from './watchUser.js';

export interface Watch {
  type: string;
  watcher: WatchUser;
  contentId: string;
}
