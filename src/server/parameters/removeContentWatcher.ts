export interface RemoveContentWatcher {
  contentId: string;
  /** Userkey of the user to delete the watcher for */
  key?: string;
  /** Username of the user to delete the watcher for */
  username?: string;
}
