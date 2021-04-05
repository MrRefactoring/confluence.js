export interface GetContentVersions {
  /** The ID of the content to be queried for its versions. */
  id: string;
  /** The starting index of the returned versions. */
  start?: number;
  /** The maximum number of versions to return per page.
    Note, this may be restricted by fixed system limits. */
  limit?: number;
  /** A multi-value parameter indicating which properties of the content to expand.

    - `collaborators` returns the users that collaborated on the version.
    - `content` returns the content for the version. */
  expand?: string[];
}
