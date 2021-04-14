export interface GetAuditRecordsForTimePeriod {
  /** The number of units for the time period. */
  number?: number;
  /** The unit of time that the time period is measured in. */
  units?: string;
  /** Filters the results to records that have string property values
   matching the `searchString`. */
  searchString?: string;
  /** The starting index of the returned records. */
  start?: number;
  /** The maximum number of records to return per page.
   Note, this may be restricted by fixed system limits. */
  limit?: number;
}
