import type { z } from 'zod';
import { apiObject } from '#/core';
import { BodyTypeSchema } from './bodyType';
/** Contains fields for each representation type requested. */

export const CustomContentBodySchema = apiObject({
  raw: BodyTypeSchema.optional(),
  storage: BodyTypeSchema.optional(),
  atlas_doc_format: BodyTypeSchema.optional(),
  view: BodyTypeSchema.optional(),
});

export type CustomContentBody = z.infer<typeof CustomContentBodySchema>;
