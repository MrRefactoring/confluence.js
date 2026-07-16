export interface GetAuditRecords {
  /**
   * Filters the results to the records on or after the `startDate`. The `startDate` must be specified as a
   * [timestamp](https://www.unixtimestamp.com/).
   */
  startDate?: string;
  /**
   * Filters the results to the records on or before the `endDate`. The `endDate` must be specified as a
   * [timestamp](https://www.unixtimestamp.com/).
   */
  endDate?: string;
  /** Filters the results to records that have string property values matching the `searchString`. */
  searchString?: string;
  /** The starting index of the returned records. */
  start?: number;
  /** The maximum number of records to return per page. Note, this may be restricted by fixed system limits. */
  limit?: number;
}
