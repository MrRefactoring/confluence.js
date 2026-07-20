import { z } from 'zod';
import { apiObject } from '#/core';

export const SpacePropertySchema = apiObject({
  /** ID of the space property. */
  id: z.string().optional(),
  /** Key of the space property. */
  key: z.string().optional(),
  /** Value of the space property. */
  value: z.unknown().optional(),
  /** RFC3339 compliant date time at which the property was created. */
  createdAt: z.coerce.date().optional(),
  version: apiObject({
    /** RFC3339 compliant date time at which the property's current version was created. */
    createdAt: z.coerce.date().optional(),
    /** Message associated with the current version. */
    message: z.string().optional(),
    /** The space property's current version number. */
    number: z.number().optional(),
    /** Atlassian account ID of the user that created the space property's current version. */
    authorId: z.string().optional(),
  }).nullish(),
  /** Atlassian account ID of the user that created the space property. */
  authorId: z.string().optional(),
});

export type SpaceProperty = z.infer<typeof SpacePropertySchema>;
