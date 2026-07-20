import { z } from 'zod';
/**
 * The primary formats a body can be represented as. A subset of BodyRepresentation. These formats are the only allowed
 * formats in certain use cases.
 */

export const PrimaryBodyRepresentationSchema = z.enum(['storage', 'atlas_doc_format']);

export type PrimaryBodyRepresentation = z.infer<typeof PrimaryBodyRepresentationSchema>;
