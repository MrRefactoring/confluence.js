import { z } from 'zod';

export const GetAuditRecordsSchema = z.object({
  /**
   * Filters the results to the records on or after the `startDate`. The `startDate` must be specified as [epoch
   * time](https://www.epochconverter.com/) in milliseconds.
   */
  startDate: z.string().optional(),
  /**
   * Filters the results to the records on or before the `endDate`. The `endDate` must be specified as [epoch
   * time](https://www.epochconverter.com/) in milliseconds.
   */
  endDate: z.string().optional(),
  /** Filters the results to records that have string property values matching the `searchString`. */
  searchString: z.string().optional(),
  /** The starting index of the returned records. */
  start: z.number().optional(),
  /** The maximum number of records to return per page. Note, this may be restricted by fixed system limits. */
  limit: z.number().optional(),
});

export type GetAuditRecords = z.input<typeof GetAuditRecordsSchema>;
