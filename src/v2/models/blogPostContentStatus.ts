import type { z } from 'zod';
import { openEnum } from '#/core';
/** The status of the content. */

export const BlogPostContentStatusSchema = openEnum(['current', 'draft', 'historical', 'trashed', 'deleted', 'any']);

export type BlogPostContentStatus = z.infer<typeof BlogPostContentStatusSchema>;
