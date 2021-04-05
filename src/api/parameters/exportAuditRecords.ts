export interface ExportAuditRecords {
  /** Filters the exported results to the records on or after the `startDate`.
    The `startDate` must be specified as a [timestamp](https://www.unixtimestamp.com/). */
  startDate?: string;
  /** Filters the exported results to the records on or before the `endDate`.
    The `endDate` must be specified as a [timestamp](https://www.unixtimestamp.com/). */
  endDate?: string;
  /** Filters the exported results to records that have string property values
    matching the `searchString`. */
  searchString?: string;
  /** The format of the export file for the audit records. */
  format?: string;
}
