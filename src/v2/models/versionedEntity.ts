import { z } from 'zod';
import { apiObject } from '#/core';
import { BodySummarySchema } from './bodySummary';

export const VersionedEntitySchema = apiObject({
  /** Title of the entity. */
  title: z.string().nullish(),
  /** ID of the entity. */
  id: z.string().optional(),
  body: BodySummarySchema.nullish(),
});

export type VersionedEntity = z.infer<typeof VersionedEntitySchema>;
