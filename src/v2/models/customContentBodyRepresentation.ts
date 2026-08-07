import type { z } from 'zod';
import { openEnum } from '#/core';
/** The formats a custom content body can be represented as. A subset of BodyRepresentation. */

export const CustomContentBodyRepresentationSchema = openEnum(['raw', 'storage', 'atlas_doc_format']);

export type CustomContentBodyRepresentation = z.infer<typeof CustomContentBodyRepresentationSchema>;
