import type { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { BlogPostBodyWriteSchema } from '#/models/blogPostBodyWrite';
/** Body of the blog post. Only one body format should be specified as the property* for this object, e.g. `storage`. */

export const BlogPostNestedBodyWriteSchema = apiObject({
  storage: BlogPostBodyWriteSchema.nullish(),
  atlas_doc_format: BlogPostBodyWriteSchema.nullish(),
  wiki: BlogPostBodyWriteSchema.nullish(),
});

export type BlogPostNestedBodyWrite = z.infer<typeof BlogPostNestedBodyWriteSchema>;
