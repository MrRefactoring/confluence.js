import { z } from 'zod';
/** Inline comment resolution status */

export const InlineCommentResolutionStatusSchema = z.enum(['open', 'reopened', 'resolved', 'dangling']);

export type InlineCommentResolutionStatus = z.infer<typeof InlineCommentResolutionStatusSchema>;
