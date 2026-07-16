import { z } from 'zod';
/** The status of the content. */

export const ContentStatusSchema = z.enum(['current', 'draft', 'archived', 'historical', 'trashed', 'deleted', 'any']);

export type ContentStatus = z.infer<typeof ContentStatusSchema>;
