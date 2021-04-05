export interface GetContent {
  /** The type of content to return. */
  type?: string;
  /** The key of the space to be queried for its content. */
  spaceKey?: string;
  /** The title of the page to be returned. Required for <code>page</code> type. */
  title?: string;
  /** Filter the results to a set of content based on their status. If set to `any`,
    content with any status is returned. Note, the `historical` status is currently
    not supported. */
  status?: string[];
  /** The posting date of the blog post to be returned. Required for
    <code>blogpost</code> type. Format: <code>yyyy-mm-dd</code>. */
  postingDay?: string;
  /**
   * A multi-value parameter indicating which properties of the content to expand.
   */
  expand?: string[];
  /** If set to `viewed`, the request will trigger a 'viewed' event for the content.
    When this event is triggered, the page/blogpost will appear on the 'Recently visited'
    tab of the user's Confluence dashboard. */
  trigger?: string;
  /** Orders the content by a particular field. Specify the field and sort direction for
    this parameter, as follows: 'fieldpath asc/desc'. For example, 'history.createdDate desc'. */
  orderby?: string;
  /** The starting index of the returned content. */
  start?: number;
  /** The maximum number of content objects to return per page.
    Note, this may be restricted by fixed system limits. */
  limit?: number;
}
