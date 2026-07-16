import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { SpaceDescriptionSchema } from '#/models/spaceDescription';
import { SpaceIconSchema } from '#/models/spaceIcon';
import { SpaceLinksSchema } from '#/models/spaceLinks';

export const DataPolicySpaceSchema = apiObject({
  /** ID of the space. */
  id: z.string().optional(),
  /** Key of the space. */
  key: z.string().optional(),
  /** Name of the space. */
  name: z.string().optional(),
  description: SpaceDescriptionSchema.nullish(),
  dataPolicy: apiObject({
    /** Whether the space contains any content blocked for (inaccessible to) the requesting client application. */
    anyContentBlocked: z.boolean().optional(),
  }).nullish(),
  icon: SpaceIconSchema.nullish(),
  _links: SpaceLinksSchema.nullish(),
});

export type DataPolicySpace = z.infer<typeof DataPolicySpaceSchema>;
