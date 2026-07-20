import { z } from 'zod';
import { RetentionPeriodSchema } from '../models';

export const SetRetentionPeriodSchema = z.object({}).extend(RetentionPeriodSchema.shape);

export type SetRetentionPeriod = z.input<typeof SetRetentionPeriodSchema>;
