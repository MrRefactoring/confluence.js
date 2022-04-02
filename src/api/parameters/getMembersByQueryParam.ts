export interface GetMembersByQueryParam {
  /** The name of the group to be queried for its members. */
  name: string;
  /** The starting index of the returned users. */
  start?: number;
  /**
   * The maximum number of users to return per page. Note, this is restricted by fixed system limit of 200 which is to
   * say if the limit parameter exceeds 200, this API will return a maximum of 200 users per page.
   */
  limit?: number;
  /**
   * Whether to include total size parameter in the results. Note, fetching total size property is an expensive
   * operation; use it if your use case needs this value.
   */
  shouldReturnTotalSize?: boolean;
}
