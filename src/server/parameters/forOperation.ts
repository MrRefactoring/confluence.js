export interface ForOperation {
  /** A comma separated list of properties to expand on the content properties. Default value: group. */
  expand?: string;
  /** Pagination start */
  start?: number;
  /** Pagination limit */
  limit?: number;
}
