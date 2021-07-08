export interface GetAuditRecords {
  startDate?: string;
  endDate?: string;
  /** Where to start within results set */
  start?: number;
  /**
   * The maximum results to fetch
   *
   * @default 1000
   */
  limit?: number;
  searchString?: string;
}
