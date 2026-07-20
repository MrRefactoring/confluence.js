import type { z } from 'zod';
import { apiObject } from '#/core';
import { CommentBodyWriteSchema } from './commentBodyWrite';
/** Body of the comment. Only one body format should be specified as the property* for this object, e.g. `storage`. */

export const CommentNestedBodyWriteSchema = apiObject({
  storage: CommentBodyWriteSchema.nullish(),
  atlas_doc_format: CommentBodyWriteSchema.nullish(),
  wiki: CommentBodyWriteSchema.nullish(),
});

export type CommentNestedBodyWrite = z.infer<typeof CommentNestedBodyWriteSchema>;
