import { z } from 'zod';
import { apiObject } from '#/core';
import { SpaceDescriptionCreateSchema } from './spaceDescriptionCreate';
/** The properties of a space that can be updated. */

export const SpaceUpdateSchema = apiObject({
  /** The updated name of the space. */
  name: z.string().max(200, 'name must be at most 200 characters').nullish(),
  description: SpaceDescriptionCreateSchema.optional(),
  /** The updated homepage for this space */
  homepage: z.record(z.string(), z.any()).nullish(),
  /** The updated type for this space. */
  type: z.string().optional(),
  /** The updated status for this space. */
  status: z.string().nullish(),
});

export type SpaceUpdate = z.infer<typeof SpaceUpdateSchema>;
