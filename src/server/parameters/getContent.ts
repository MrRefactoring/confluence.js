export interface GetContent {
  /** The content type to return. Default value: page. Valid values: page, blogpost. */
  type?: string;
  /** The space key to find content under. */
  spaceKey?: string;
  /** The title of the page to find. Required for page type. */
  title?: string;
  /**
   * List of statuses the content to be found is in. Defaults to current is not specified. If set to 'any', content in
   * 'current' and 'trashed' status will be fetched. Does not support 'historical' status for now.
   */
  status?: string;
  /** The posting day of the blog post. Required for blogpost type. Format: yyyy-mm-dd. Example: 2013-02-13 */
  postingDay?: string;
  /** A comma separated list of properties to expand on the content. Default value: history,space,version. */
  expand?: string;
  /** The start point of the collection to return */
  start?: number;
  /** The limit of the number of items to return, this may be restricted by fixed system limits */
  limit?: number;
}
