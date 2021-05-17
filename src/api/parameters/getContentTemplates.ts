export interface GetContentTemplates {
  /** The key of the space to be queried for templates. If the `spaceKey` is not specified, global templates will be returned. */
  spaceKey?: string;
  /** The starting index of the returned templates. */
  start?: number;
  /** The maximum number of templates to return per page. Note, this may be restricted by fixed system limits. */
  limit?: number;
  /**
   * A multi-value parameter indicating which properties of the template to expand.
   *
   * - `body` returns the content of the template in storage format.
   */
  expand?: string[];
}
