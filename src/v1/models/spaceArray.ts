import { z } from 'zod';
import { apiObject } from '#/core';
import { SpaceSchema, type Space, type SpaceInput } from './space';
import { GenericLinksSchema } from './genericLinks';

export const SpaceArraySchema = apiObject({
  results: z.array(SpaceSchema as z.ZodType<Space, SpaceInput>),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
  _links: GenericLinksSchema,
});

export type SpaceArray = z.infer<typeof SpaceArraySchema>;
