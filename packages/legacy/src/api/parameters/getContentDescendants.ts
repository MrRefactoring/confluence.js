export interface GetContentDescendants {
  /** The ID of the content to be queried for its descendants. */
  id: string;
  /**
   * A multi-value parameter indicating which properties of the children to expand, where:
   *
   * - `attachment` returns all attachments for the content.
   * - `comments` returns all comments for the content.
   * - `page` returns all child pages of the content.
   */
  expand?: string[];
}
