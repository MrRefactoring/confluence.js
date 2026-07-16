export interface GetWatchersForSpace {
  /** The key of the space to get watchers. */
  spaceKey: string;
  /** The start point of the collection to return. */
  start?: string;
  /** The limit of the number of items to return, this may be restricted by fixed system limits. */
  limit?: string;
}
