import type { z } from 'zod';
import { apiObject } from '#/core';
import { BodyTypeSchema } from './bodyType';
/** Contains fields for each representation type requested. */

export const BodySummarySchema = apiObject({
  storage: BodyTypeSchema.optional(),
  atlas_doc_format: BodyTypeSchema.optional(),
});

export type BodySummary = z.infer<typeof BodySummarySchema>;
