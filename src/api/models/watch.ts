import { WatchUser } from './watchUser';

export interface Watch {
  type: string;
  watcher: WatchUser;
  contentId: string;
}
