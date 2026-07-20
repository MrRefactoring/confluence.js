import { z } from 'zod';
import { apiObject } from '#/core';
import { DescendantsSchema } from './descendants';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const SmartLinkDescendantsSchema = apiObject({
  results: z.array(DescendantsSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type SmartLinkDescendants = z.infer<typeof SmartLinkDescendantsSchema>;
