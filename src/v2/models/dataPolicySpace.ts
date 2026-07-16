import { z } from 'zod';
import { apiObject } from '#/core';
import { SpaceDescriptionSchema } from './spaceDescription';
import { SpaceIconSchema } from './spaceIcon';
import { SpaceLinksSchema } from './spaceLinks';

export const DataPolicySpaceSchema = apiObject({
  /** ID of the space. */
  id: z.string().optional(),
  /** Key of the space. */
  key: z.string().optional(),
  /** Name of the space. */
  name: z.string().optional(),
  description: SpaceDescriptionSchema.optional(),
  dataPolicy: apiObject({
    /** Whether the space contains any content blocked for (inaccessible to) the requesting client application. */
    anyContentBlocked: z.boolean().optional(),
  }).optional(),
  icon: SpaceIconSchema.optional(),
  _links: SpaceLinksSchema.optional(),
});

export type DataPolicySpace = z.infer<typeof DataPolicySpaceSchema>;
