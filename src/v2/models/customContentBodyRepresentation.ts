import { z } from 'zod';
/** The formats a custom content body can be represented as. A subset of BodyRepresentation. */

export const CustomContentBodyRepresentationSchema = z.enum(['raw', 'storage', 'atlas_doc_format']);

export type CustomContentBodyRepresentation = z.infer<typeof CustomContentBodyRepresentationSchema>;
