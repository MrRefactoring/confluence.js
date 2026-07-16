import { z } from 'zod';
import { apiObject } from '#/core';
import { VersionSchema } from './version';

export const ContentPropertySchema = apiObject({
  /** ID of the property */
  id: z.string().optional(),
  /** Key of the property */
  key: z.string().optional(),
  /** Value of the property. Must be a valid JSON value. */
  value: z.unknown().optional(),
  version: VersionSchema.nullish(),
});

export type ContentProperty = z.infer<typeof ContentPropertySchema>;
