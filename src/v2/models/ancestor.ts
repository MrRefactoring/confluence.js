import { z } from 'zod';
import { apiObject } from '#/core';
import { AncestorTypeSchema } from './ancestorType';

export const AncestorSchema = apiObject({
  /** ID of the ancestor */
  id: z.string().optional(),
  type: AncestorTypeSchema.optional(),
});

export type Ancestor = z.infer<typeof AncestorSchema>;
