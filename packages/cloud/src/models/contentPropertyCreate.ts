import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const ContentPropertyCreateSchema = apiObject({
  /** Key of the content property */
  key: z.string().optional(),
  /** Value of the content property. */
  value: z.unknown().optional(),
});

export type ContentPropertyCreate = z.infer<typeof ContentPropertyCreateSchema>;
