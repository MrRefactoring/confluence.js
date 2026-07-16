import type { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { PageBodyWriteSchema } from '#/models/pageBodyWrite';
/** Body of the page. Only one body format should be specified as the property* for this object, e.g. `storage`. */

export const PageNestedBodyWriteSchema = apiObject({
  storage: PageBodyWriteSchema.nullish(),
  atlas_doc_format: PageBodyWriteSchema.nullish(),
  wiki: PageBodyWriteSchema.nullish(),
});

export type PageNestedBodyWrite = z.infer<typeof PageNestedBodyWriteSchema>;
