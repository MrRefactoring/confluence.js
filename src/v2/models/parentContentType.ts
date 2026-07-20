import { z } from 'zod';
/** Content type of the parent, or null if there is no parent. */

export const ParentContentTypeSchema = z.enum(['page', 'whiteboard', 'database', 'embed', 'folder']);

export type ParentContentType = z.infer<typeof ParentContentTypeSchema>;
