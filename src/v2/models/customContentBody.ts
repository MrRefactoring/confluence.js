import type { z } from 'zod';
import { apiObject } from '#/core';
import { BodyTypeSchema } from './bodyType';
/** Contains fields for each representation type requested. */

export const CustomContentBodySchema = apiObject({
  raw: BodyTypeSchema.nullish(),
  storage: BodyTypeSchema.nullish(),
  atlas_doc_format: BodyTypeSchema.nullish(),
  view: BodyTypeSchema.nullish(),
});

export type CustomContentBody = z.infer<typeof CustomContentBodySchema>;
