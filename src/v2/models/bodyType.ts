import { z } from 'zod';
import { apiObject } from '#/core';

export const BodyTypeSchema = apiObject({
  /** Type of content representation used for the value field. */
  representation: z.string().optional(),
  /** Body of the content, in the format found in the representation field. */
  value: z.string().optional(),
});

export type BodyType = z.infer<typeof BodyTypeSchema>;
