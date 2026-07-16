import { z } from 'zod';
import { apiObject } from '#/core';
import { ChildCustomContentSchema } from './childCustomContent';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const ChildCustomContentGetSchema = apiObject({
  results: z.array(ChildCustomContentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type ChildCustomContentGet = z.infer<typeof ChildCustomContentGetSchema>;
