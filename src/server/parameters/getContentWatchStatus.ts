export interface GetContentWatchStatus {
  contentId: string;
  /** Userkey of the user to check for watching state */
  key?: string;
  /** Username of the user to check for watching state */
  username?: string;
}
