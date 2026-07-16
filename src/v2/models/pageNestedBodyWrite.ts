import type { z } from 'zod';
import { apiObject } from '#/core';
import { PageBodyWriteSchema } from './pageBodyWrite';
/** Body of the page. Only one body format should be specified as the property* for this object, e.g. `storage`. */

export const PageNestedBodyWriteSchema = apiObject({
  storage: PageBodyWriteSchema.optional(),
  atlas_doc_format: PageBodyWriteSchema.optional(),
  wiki: PageBodyWriteSchema.optional(),
});

export type PageNestedBodyWrite = z.infer<typeof PageNestedBodyWriteSchema>;
