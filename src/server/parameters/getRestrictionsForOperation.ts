export interface GetRestrictionsForOperation {
  id: string | number;
  operationKey: string;
  /** A comma separated list of properties to expand on the content properties. Default value: group. */
  expand?: string;
  /** Pagination start */
  start?: number;
  /** Pagination limit */
  limit?: number;
}
