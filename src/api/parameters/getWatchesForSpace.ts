export interface GetWatchesForSpace {
  /** The ID of the content to be queried for its watches. */
  id: string;
  /** The starting index of the returned watches. */
  start?: number;
  /** The maximum number of watches to return per page.
    Note, this may be restricted by fixed system limits. */
  limit?: number;
}
