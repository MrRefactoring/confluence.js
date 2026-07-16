import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentBodyConversionInputSchema } from './contentBodyConversionInput';

export const BulkContentBodyConversionInputSchema = apiObject({
  conversionInputs: z.array(ContentBodyConversionInputSchema).optional(),
});

export type BulkContentBodyConversionInput = z.infer<typeof BulkContentBodyConversionInputSchema>;
