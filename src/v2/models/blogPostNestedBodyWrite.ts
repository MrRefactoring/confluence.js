import type { z } from 'zod';
import { apiObject } from '#/core';
import { BlogPostBodyWriteSchema } from './blogPostBodyWrite';
/** Body of the blog post. Only one body format should be specified as the property* for this object, e.g. `storage`. */

export const BlogPostNestedBodyWriteSchema = apiObject({
  storage: BlogPostBodyWriteSchema.optional(),
  atlas_doc_format: BlogPostBodyWriteSchema.optional(),
  wiki: BlogPostBodyWriteSchema.optional(),
});

export type BlogPostNestedBodyWrite = z.infer<typeof BlogPostNestedBodyWriteSchema>;
