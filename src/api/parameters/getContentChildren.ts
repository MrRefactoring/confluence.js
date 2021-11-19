export interface GetContentChildren {
  /** The ID of the content to be queried for its children. */
  id: string;
  /**
   * A multi-value parameter indicating which properties of the children to expand, where:
   *
   * - `attachment` returns all attachments for the content.
   * - `comments` returns all comments for the content.
   * - `page` returns all child pages of the content.
   * - Custom content types that are provided by apps are also supported.
   */
  expand?: string[];
  /** The version of the parent content to retrieve children for. Currently, this only works for the latest version. */
  parentVersion?: number;
}
