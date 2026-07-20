import { z } from 'zod';
import { apiObject } from '#/core';

export const AffectedObjectSchema = apiObject({
  name: z.string(),
  objectType: z.string(),
});

export type AffectedObject = z.infer<typeof AffectedObjectSchema>;
