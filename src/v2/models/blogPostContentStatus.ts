import { z } from 'zod';
/** The status of the content. */

export const BlogPostContentStatusSchema = z.enum(['current', 'draft', 'historical', 'trashed', 'deleted', 'any']);

export type BlogPostContentStatus = z.infer<typeof BlogPostContentStatusSchema>;
