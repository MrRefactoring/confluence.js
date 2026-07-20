import { z } from 'zod';
import { apiObject } from '#/core';
import { PropertyValueSchema } from './propertyValue';

export const SpacePropertyCreateSchema = apiObject({
  /** The key of the new property. */
  key: z.string(),
  value: PropertyValueSchema,
  space: apiObject({
    /** The key of the space */
    key: z.string().optional(),
  }).optional(),
});

export type SpacePropertyCreate = z.infer<typeof SpacePropertyCreateSchema>;
