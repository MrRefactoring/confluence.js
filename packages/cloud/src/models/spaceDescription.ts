import type { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { BodyTypeSchema } from '#/models/bodyType';
/** Contains fields for each representation type requested. */

export const SpaceDescriptionSchema = apiObject({
  plain: BodyTypeSchema.nullish(),
  view: BodyTypeSchema.nullish(),
});

export type SpaceDescription = z.infer<typeof SpaceDescriptionSchema>;
