import { z } from 'zod';
import { apiObject } from '#/core';
import { BodySummarySchema } from './bodySummary';

export const VersionedEntitySchema = apiObject({
  /** Title of the entity. */
  title: z.string().optional(),
  /** ID of the entity. */
  id: z.string().optional(),
  body: BodySummarySchema.optional(),
});

export type VersionedEntity = z.infer<typeof VersionedEntitySchema>;
