export interface GetRestrictionsForOperation {
  /** The ID of the content to be queried for its restrictions. */
  id: string;
  /** The operation type of the restrictions to be returned. */
  operationKey: string;
  /** A multi-value parameter indicating which properties of the content
    restrictions to expand.

    - `restrictions.user` returns the piece of content that the restrictions are
    applied to. Expanded by default.
    - `restrictions.group` returns the piece of content that the restrictions are
    applied to. Expanded by default.
    - `content` returns the piece of content that the restrictions are
    applied to. */
  expand?: string[];
  /** The starting index of the users and groups in the returned restrictions. */
  start?: number;
  /** The maximum number of users and the maximum number of groups, in the
    returned restrictions, to return per page. Note, this may be restricted
    by fixed system limits. */
  limit?: number;
}
