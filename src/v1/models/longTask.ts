import { z } from 'zod';
import { apiObject } from '#/core';

export const LongTaskSchema = apiObject({
  /** The ARI for the long task, based on its ID */
  ari: z.string().optional(),
  /** A unique identifier for the long task */
  id: z.string(),
  links: apiObject({
    /** The URL to retrive status of long task. */
    status: z.string().optional(),
  }),
});

export type LongTask = z.infer<typeof LongTaskSchema>;
