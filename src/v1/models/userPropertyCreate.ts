import { z } from 'zod';
import { apiObject } from '#/core';

export const UserPropertyCreateSchema = apiObject({
  /** The value of the user property. */
  value: z.record(z.string(), z.any()),
});

export type UserPropertyCreate = z.infer<typeof UserPropertyCreateSchema>;
