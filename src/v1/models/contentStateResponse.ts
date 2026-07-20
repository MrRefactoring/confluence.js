import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentStateSchema } from './contentState';

export const ContentStateResponseSchema = apiObject({
  /** Null or content state */
  contentState: ContentStateSchema.optional(),
  /** Timestamp of last publish event where content state changed */
  lastUpdated: z.string().optional(),
});

export type ContentStateResponse = z.infer<typeof ContentStateResponseSchema>;
