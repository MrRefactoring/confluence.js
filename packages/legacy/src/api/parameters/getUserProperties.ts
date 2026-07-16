export interface GetUserProperties {
  /** The account ID of the user to be queried for its properties. */
  userId: string;
  /** The starting index of the returned properties. */
  start?: number;
  /** The maximum number of properties to return per page. Note, this may be restricted by fixed system limits. */
  limit?: number;
}
