import type { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { BodyTypeSchema } from '#/models/bodyType';
/** Contains fields for each representation type requested. */

export const TaskBodySchema = apiObject({
  storage: BodyTypeSchema.nullish(),
  atlas_doc_format: BodyTypeSchema.nullish(),
});

export type TaskBody = z.infer<typeof TaskBodySchema>;
