export interface GetContentProperty {
  /** The ID of the content to be queried for the property. */
  id: string;
  /** The key of the content property. */
  key: string;
  /**
   * A multi-value parameter indicating which properties of the content to expand. By default, the `version` object is expanded.
   *
   * - `content` returns the content that the property is stored against.
   * - `version` returns information about the version of the property, such as the version number, when it was created, etc.
   */
  expand?: string[];
  /**
   * Filter the results to a set of content based on their status. If set to `any`, content with any status is returned.
   * By default it will fetch current and archived statuses `?status=current&status=archived`. All supported statuses
   *
   * - any
   * - archived
   * - current
   * - deleted
   * - draft
   * - trashed
   */
  status?: string[];
}
