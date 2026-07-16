import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const SpacePropertyUpdateSchema = apiObject({
  /** Key of the space property */
  key: z.string().optional(),
  /** Value of the space property. */
  value: z.unknown().optional(),
  /** New version number and associated message */
  version: apiObject({
    /** Version number of the new version. Should be 1 more than the current version number. */
    number: z.number().optional(),
    /** Message to be associated with the new version. */
    message: z.string().optional(),
  }).nullish(),
});

export type SpacePropertyUpdate = z.infer<typeof SpacePropertyUpdateSchema>;
