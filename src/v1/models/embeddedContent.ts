import { z } from 'zod';
import { apiObject } from '#/core';
import { EmbeddableSchema } from './embeddable';

export const EmbeddedContentSchema = apiObject({
  entityId: z.number().optional(),
  entityType: z.string().optional(),
  entity: EmbeddableSchema.optional(),
});

export type EmbeddedContent = z.infer<typeof EmbeddedContentSchema>;
