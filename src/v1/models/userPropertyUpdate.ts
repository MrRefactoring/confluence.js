import { z } from 'zod';
import { apiObject } from '#/core';

export const UserPropertyUpdateSchema = apiObject({
  /** The value of the user property. */
  value: z.record(z.string(), z.any()),
});

export type UserPropertyUpdate = z.infer<typeof UserPropertyUpdateSchema>;
