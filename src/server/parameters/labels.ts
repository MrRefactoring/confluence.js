export interface Labels {
  /** The prefixes to filter the labels with {@see Label.Prefix} */
  prefix?: string;
  /** The start point of the collection to return */
  start?: number;
  /** The limit of the number of labels to return, this may be restricted by fixed system limits */
  limit?: number;
}
