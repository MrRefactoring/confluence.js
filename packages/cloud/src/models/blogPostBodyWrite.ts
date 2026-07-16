import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const BlogPostBodyWriteSchema = apiObject({
  /** Type of content representation used for the value field. */
  representation: z.enum(['storage', 'atlas_doc_format', 'wiki']).optional(),
  /** Body of the blog post, in the format found in the representation field. */
  value: z.string().optional(),
});

export type BlogPostBodyWrite = z.infer<typeof BlogPostBodyWriteSchema>;
