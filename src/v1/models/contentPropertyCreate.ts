import { z } from 'zod';
import { apiObject } from '#/core';

export const ContentPropertyCreateSchema = apiObject({
  /** The key of the new property. */
  key: z.string().max(255, 'key must be at most 255 characters'),
  /** The value of the content property. This can be empty or a complex object. */
  value: z.union([z.array(z.string()), z.boolean(), z.record(z.string(), z.any()), z.string()]),
});

export type ContentPropertyCreate = z.infer<typeof ContentPropertyCreateSchema>;
