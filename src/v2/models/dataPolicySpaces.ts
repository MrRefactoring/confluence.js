import { z } from 'zod';
import { apiObject } from '#/core';
import { DataPolicySpaceSchema } from './dataPolicySpace';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const DataPolicySpacesSchema = apiObject({
  results: z.array(DataPolicySpaceSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type DataPolicySpaces = z.infer<typeof DataPolicySpacesSchema>;
