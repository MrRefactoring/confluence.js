export interface Children {
  /** A comma separated list of properties to expand on the children */
  expand?: string;
  /** An int representing the version of the content to retrieve children for */
  parentVersion?: number;
  start?: number;
  limit?: number;
}
