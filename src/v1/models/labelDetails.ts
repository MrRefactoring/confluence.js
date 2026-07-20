import type { z } from 'zod';
import { apiObject } from '#/core';
import { LabelSchema } from './label';
import { LabeledContentPageResponseSchema } from './labeledContentPageResponse';

export const LabelDetailsSchema = apiObject({
  label: LabelSchema,
  associatedContents: LabeledContentPageResponseSchema.optional(),
});

export type LabelDetails = z.infer<typeof LabelDetailsSchema>;
