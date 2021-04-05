export interface GetGroupsSearch {
  /** the search term used to query results. */
  query: string;
  /** The starting index of the returned groups. */
  start?: number;
  /** The maximum number of groups to return per page.
    Note, this is restricted to a maximum limit of 200 groups. */
  limit?: number;
}
