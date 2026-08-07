import type { z } from 'zod';
import { openEnum } from '#/core';
/** The formats a custom content body can be represented as. A subset of BodyRepresentation. */

export const CustomContentBodyRepresentationSingleSchema = openEnum([
  'raw',
  'storage',
  'atlas_doc_format',
  'view',
  'export_view',
  'anonymous_export_view',
]);

export type CustomContentBodyRepresentationSingle = z.infer<typeof CustomContentBodyRepresentationSingleSchema>;
