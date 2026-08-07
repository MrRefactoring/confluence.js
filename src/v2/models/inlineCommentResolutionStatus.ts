import type { z } from 'zod';
import { openEnum } from '#/core';
/** Inline comment resolution status */

export const InlineCommentResolutionStatusSchema = openEnum(['open', 'reopened', 'resolved', 'dangling']);

export type InlineCommentResolutionStatus = z.infer<typeof InlineCommentResolutionStatusSchema>;
