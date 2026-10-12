import { z } from 'zod';
import { BulkContentBodyConversionInputSchema } from '../models';

export const BulkAsyncConvertContentBodyRequestSchema = z.object(BulkContentBodyConversionInputSchema.shape);

export type BulkAsyncConvertContentBodyRequest = z.input<typeof BulkAsyncConvertContentBodyRequestSchema>;
