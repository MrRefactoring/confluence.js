export interface GetContentProperties {
  /** The ID of the content to be queried for its properties. */
  id: string;
  /** A multi-value parameter indicating which properties of the content to
   expand. By default, the `version` object is expanded.

   - `content` returns the content that the property is stored against.
   - `version` returns information about the version of the property, such
   as the version number, when it was created, etc. */
  expand?: string[];
  /** The starting index of the returned properties. */
  start?: number;
  /** The maximum number of properties to return per page.
   Note, this may be restricted by fixed system limits. */
  limit?: number;
}
