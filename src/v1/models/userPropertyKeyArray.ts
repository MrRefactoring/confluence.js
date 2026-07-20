import { z } from 'zod';
import { apiObject } from '#/core';
import { GenericLinksSchema } from './genericLinks';

export const UserPropertyKeyArraySchema = apiObject({
  results: z.array(
    apiObject({
      key: z.string().optional(),
    }),
  ),
  start: z.number().optional(),
  limit: z.number().optional(),
  size: z.number().optional(),
  _links: GenericLinksSchema.optional(),
});

export type UserPropertyKeyArray = z.infer<typeof UserPropertyKeyArraySchema>;
