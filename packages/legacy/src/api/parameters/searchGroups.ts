export interface SearchGroups {
  /** The search term used to query results. */
  query: string;
  /** The starting index of the returned groups. */
  start?: number;
  /** The maximum number of groups to return per page. Note, this is restricted to a maximum limit of 200 groups. */
  limit?: number;
  /**
   * Whether to include total size parameter in the results. Note, fetching total size property is an expensive
   * operation; use it if your use case needs this value.
   */
  shouldReturnTotalSize?: boolean;
}
