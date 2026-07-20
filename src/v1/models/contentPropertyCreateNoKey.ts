import { z } from 'zod';
import { apiObject } from '#/core';

export const ContentPropertyCreateNoKeySchema = apiObject({
  /** The value of the content property. This can be empty or a complex object. */
  value: z.union([z.array(z.string()), z.boolean(), z.record(z.string(), z.any()), z.string()]),
});

export type ContentPropertyCreateNoKey = z.infer<typeof ContentPropertyCreateNoKeySchema>;
