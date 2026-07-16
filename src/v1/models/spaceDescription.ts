import { z } from 'zod';
import { apiObject } from '#/core';

export const SpaceDescriptionSchema = apiObject({
  value: z.string(),
  representation: z.enum(['plain', 'view']),
  embeddedContent: z.array(z.record(z.string(), z.any())),
});

export type SpaceDescription = z.infer<typeof SpaceDescriptionSchema>;
