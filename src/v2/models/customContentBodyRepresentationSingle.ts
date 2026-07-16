import { z } from 'zod';
/** The formats a custom content body can be represented as. A subset of BodyRepresentation. */

export const CustomContentBodyRepresentationSingleSchema = z.enum([
  'raw',
  'storage',
  'atlas_doc_format',
  'view',
  'export_view',
  'anonymous_export_view',
]);

export type CustomContentBodyRepresentationSingle = z.infer<typeof CustomContentBodyRepresentationSingleSchema>;
