import { z } from 'zod';
import { BulkContentBodyConversionInputSchema } from '../models';

export const BulkAsyncConvertContentBodyRequestSchema = z.object({}).extend(BulkContentBodyConversionInputSchema.shape);

export type BulkAsyncConvertContentBodyRequest = z.input<typeof BulkAsyncConvertContentBodyRequestSchema>;
