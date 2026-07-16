import type { z } from 'zod';
import { apiObject } from '#/core';
import { BodyTypeSchema } from './bodyType';
/** Contains fields for each representation type requested. */

export const SpaceDescriptionSchema = apiObject({
  plain: BodyTypeSchema.nullish(),
  view: BodyTypeSchema.nullish(),
});

export type SpaceDescription = z.infer<typeof SpaceDescriptionSchema>;
