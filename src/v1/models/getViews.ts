import { z } from 'zod';
import { apiObject } from '#/core';

export const GetViewsSchema = apiObject({
  /** The content ID. */
  id: z.number().optional(),
  /** The total number of views for the content. */
  count: z.number().optional(),
});

export type GetViews = z.infer<typeof GetViewsSchema>;
