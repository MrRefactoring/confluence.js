import type { z } from 'zod';
import { apiObject } from '#/core';
import { CustomContentBodyWriteSchema } from './customContentBodyWrite';
/**
 * Body of the custom content. Only one body format should be specified as the property* for this object, e.g.
 * `storage`.
 */

export const CustomContentNestedBodyWriteSchema = apiObject({
  storage: CustomContentBodyWriteSchema.optional(),
  atlas_doc_format: CustomContentBodyWriteSchema.optional(),
  raw: CustomContentBodyWriteSchema.optional(),
});

export type CustomContentNestedBodyWrite = z.infer<typeof CustomContentNestedBodyWriteSchema>;
