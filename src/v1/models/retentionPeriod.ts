import { z } from 'zod';
import { apiObject } from '#/core';

export const RetentionPeriodSchema = apiObject({
  /** The number of units for the retention period. */
  number: z.number(),
  /** The unit of time that the retention period is measured in. */
  units: z.enum([
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
    'MILLENNIA',
    'ERAS',
    'FOREVER',
  ]),
});

export type RetentionPeriod = z.infer<typeof RetentionPeriodSchema>;
