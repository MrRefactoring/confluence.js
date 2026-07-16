import { z } from 'zod';

export const ExportAuditRecordsSchema = z.object({
  /**
   * Filters the exported results to the records on or after the `startDate`. The `startDate` must be specified as
   * [epoch time](https://www.epochconverter.com/) in milliseconds.
   */
  startDate: z.string().optional(),
  /**
   * Filters the exported results to the records on or before the `endDate`. The `endDate` must be specified as [epoch
   * time](https://www.epochconverter.com/) in milliseconds.
   */
  endDate: z.string().optional(),
  /** Filters the exported results to records that have string property values matching the `searchString`. */
  searchString: z.string().optional(),
  /** The format of the export file for the audit records. */
  format: z.enum(['csv', 'zip']).optional(),
});

export type ExportAuditRecords = z.input<typeof ExportAuditRecordsSchema>;
