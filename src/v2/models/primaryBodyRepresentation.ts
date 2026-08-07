import type { z } from 'zod';
import { openEnum } from '#/core';
/**
 * The primary formats a body can be represented as. A subset of BodyRepresentation. These formats are the only allowed
 * formats in certain use cases.
 */

export const PrimaryBodyRepresentationSchema = openEnum(['storage', 'atlas_doc_format']);

export type PrimaryBodyRepresentation = z.infer<typeof PrimaryBodyRepresentationSchema>;
