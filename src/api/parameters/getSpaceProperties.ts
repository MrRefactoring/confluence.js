export interface GetSpaceProperties {
  /** The key of the space to be queried for its properties. */
  spaceKey: string;
  /** A multi-value parameter indicating which properties of the space
   property to expand. By default, the `version` object is expanded.

   - `version` returns information about the version of the content.
   - `space` returns the space that the properties are in. */
  expand?: string[];
  /** The starting index of the returned objects. */
  start?: number;
  /** The maximum number of properties to return per page. Note, this may be
   restricted by fixed system limits. */
  limit?: number;
}
