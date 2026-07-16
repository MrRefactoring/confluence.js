import { z } from 'zod';
import { apiObject } from '#/core';

export const GlobalSpaceIdentifierSchema = apiObject({
  spaceIdentifier: z.string(),
});

export type GlobalSpaceIdentifier = z.infer<typeof GlobalSpaceIdentifierSchema>;
