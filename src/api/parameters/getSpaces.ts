export interface GetSpaces {
  /** The key of the space to be returned. To return multiple spaces, specify this parameter multiple times with different values. */
  spaceKey?: string[];
  /** The id of the space to be returned. To return multiple spaces, specify this parameter multiple times with different values. */
  spaceId?: number[];
  /** Filter the results to spaces based on their type. */
  type?: string;
  /** Filter the results to spaces based on their status. */
  status?: string;
  /** Filter the results to spaces based on their label. */
  label?: string[];
  /**
   * Filter the results to the favourite spaces of the user specified by `favouriteUserKey`. Note, 'favourite' spaces
   * are also known as 'saved for later' spaces.
   */
  favourite?: boolean;
  /**
   * The userKey of the user, whose favourite spaces are used to filter the results when using the `favourite` parameter.
   *
   * Leave blank for the current user. Use [Get user](#api-user-get) to get the userKey for a user.
   */
  favouriteUserKey?: string;
  /** A multi-value parameter indicating which properties of the content to expand. */
  expand?: string[];
  /** The starting index of the returned spaces. */
  start?: number;
  /** The maximum number of spaces to return per page. Note, this may be restricted by fixed system limits. */
  limit?: number;
}
