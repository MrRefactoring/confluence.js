import { z } from 'zod';

export const GetAuditRecordsForTimePeriodSchema = z.object({
  /** The number of units for the time period. */
  number: z.number().optional(),
  /** The unit of time that the time period is measured in. */
  units: z
    .enum([
      'NANOS',
      'MICROS',
      'MILLIS',
      'SECONDS',
      'MINUTES',
      'HOURS',
      'HALF_DAYS',
      'DAYS',
      'WEEKS',
      'MONTHS',
      'YEARS',
      'DECADES',
      'CENTURIES',
    ])
    .optional(),
  /** Filters the results to records that have string property values matching the `searchString`. */
  searchString: z.string().optional(),
  /** The starting index of the returned records. */
  start: z.number().optional(),
  /** The maximum number of records to return per page. Note, this may be restricted by fixed system limits. */
  limit: z.number().optional(),
});

export type GetAuditRecordsForTimePeriod = z.input<typeof GetAuditRecordsForTimePeriodSchema>;
