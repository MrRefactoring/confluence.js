import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const BlogPostBodyWriteSchema = apiObject({
  /** Type of content representation used for the value field. */
  representation: openEnum(['storage', 'atlas_doc_format', 'wiki']).optional(),
  /** Body of the blog post, in the format found in the representation field. */
  value: z.string().optional(),
});

export type BlogPostBodyWrite = z.infer<typeof BlogPostBodyWriteSchema>;
