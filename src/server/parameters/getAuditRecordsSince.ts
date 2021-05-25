export interface GetAuditRecordsSince {
  /** The amount of time periods */
  number?: {};
  /** The units to use for the time periods eg. 'days', 'months' etc */
  units?: string;
  /** Where to start within results set */
  start?: number;
  /** The maximum results to fetch */
  limit?: number;
  searchString?: string;
}
