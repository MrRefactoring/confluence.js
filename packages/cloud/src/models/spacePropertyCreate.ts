import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const SpacePropertyCreateSchema = apiObject({
  /** Key of the space property */
  key: z.string().optional(),
  /** Value of the space property. */
  value: z.unknown().optional(),
});

export type SpacePropertyCreate = z.infer<typeof SpacePropertyCreateSchema>;
