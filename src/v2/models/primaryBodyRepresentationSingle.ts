import { z } from 'zod';
/**
 * The primary formats a body can be represented as. A subset of BodyRepresentation. These formats are the only allowed
 * formats in certain use cases.
 */

export const PrimaryBodyRepresentationSingleSchema = z.enum([
  'storage',
  'atlas_doc_format',
  'view',
  'export_view',
  'anonymous_export_view',
  'styled_view',
  'editor',
]);

export type PrimaryBodyRepresentationSingle = z.infer<typeof PrimaryBodyRepresentationSingleSchema>;
