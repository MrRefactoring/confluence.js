import { z } from 'zod';
/** The type of ancestor. */

export const AncestorTypeSchema = z.enum(['page', 'whiteboard', 'database', 'embed', 'folder']);

export type AncestorType = z.infer<typeof AncestorTypeSchema>;
