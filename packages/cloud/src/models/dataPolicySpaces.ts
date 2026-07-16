import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { DataPolicySpaceSchema } from './dataPolicySpace.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const DataPolicySpacesSchema = apiObject({
  results: z.array(DataPolicySpaceSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type DataPolicySpaces = z.infer<typeof DataPolicySpacesSchema>;
