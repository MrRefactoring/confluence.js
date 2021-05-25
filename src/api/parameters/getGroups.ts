export interface GetGroups {
  /** The starting index of the returned groups. */
  start?: number;
  /** The maximum number of groups to return per page. Note, this may be restricted by fixed system limits. */
  limit?: number;
}
