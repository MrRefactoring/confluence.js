import { z } from 'zod';
import { apiObject } from '#/core';
import { LabeledContentTypeSchema } from './labeledContentType';

export const LabeledContentSchema = apiObject({
  contentType: LabeledContentTypeSchema,
  contentId: z.number(),
  /** Title of the content. */
  title: z.string(),
});

export type LabeledContent = z.infer<typeof LabeledContentSchema>;
