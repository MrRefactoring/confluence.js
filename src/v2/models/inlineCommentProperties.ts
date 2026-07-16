import { z } from 'zod';
import { apiObject } from '#/core';

export const InlineCommentPropertiesSchema = apiObject({
  /** Property value used to reference the highlighted element in DOM. */
  inlineMarkerRef: z.string().optional(),
  /** Text that is highlighted. */
  inlineOriginalSelection: z.string().optional(),
});

export type InlineCommentProperties = z.infer<typeof InlineCommentPropertiesSchema>;
