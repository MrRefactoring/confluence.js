import { z } from 'zod';
import { apiObject } from '#/core';
import { ChildrenSchema } from './children';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const SmartLinkDirectChildrenSchema = apiObject({
  results: z.array(ChildrenSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type SmartLinkDirectChildren = z.infer<typeof SmartLinkDirectChildrenSchema>;
