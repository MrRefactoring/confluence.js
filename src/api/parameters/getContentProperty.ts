export interface GetContentProperty {
  /** The ID of the content to be queried for the property. */
  id: string;
  /** The key of the content property. */
  key: string;
  /** A multi-value parameter indicating which properties of the content to
    expand. By default, the `version` object is expanded.

    - `content` returns the content that the property is stored against.
    - `version` returns information about the version of the property, such
    as the version number, when it was created, etc. */
  expand?: string[];
}
