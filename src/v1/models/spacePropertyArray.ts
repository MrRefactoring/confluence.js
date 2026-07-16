import { z } from 'zod';
import { apiObject } from '#/core';
import { SpacePropertySchema } from './spaceProperty';
import { GenericLinksSchema } from './genericLinks';

export const SpacePropertyArraySchema = apiObject({
  results: z.array(SpacePropertySchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
  _links: GenericLinksSchema,
});

export type SpacePropertyArray = z.infer<typeof SpacePropertyArraySchema>;
