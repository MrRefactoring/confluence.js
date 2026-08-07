import type { z } from 'zod';
import { openEnum } from '#/core';
/** The type of ancestor. */

export const AncestorTypeSchema = openEnum(['page', 'whiteboard', 'database', 'embed', 'folder']);

export type AncestorType = z.infer<typeof AncestorTypeSchema>;
