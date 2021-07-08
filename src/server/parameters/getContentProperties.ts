export interface GetContentProperties {
  id: string | number;
  /** A comma separated list of properties to expand on the content properties. Default value: version. */
  expand?: string;
  /** The start point of the collection to return */
  start?: number;
  /** The limit of the number of items to return, this may be restricted by fixed system limits */
  limit?: number;
}
