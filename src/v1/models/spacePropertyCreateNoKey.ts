import type { z } from 'zod';
import { apiObject } from '#/core';
import { PropertyValueSchema } from './propertyValue';

export const SpacePropertyCreateNoKeySchema = apiObject({
  value: PropertyValueSchema,
});

export type SpacePropertyCreateNoKey = z.infer<typeof SpacePropertyCreateNoKeySchema>;
