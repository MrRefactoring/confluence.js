import type { z } from 'zod';
import { openEnum } from '#/core';
/** Content type of the parent, or null if there is no parent. */

export const ParentContentTypeSchema = openEnum(['page', 'whiteboard', 'database', 'embed', 'folder']);

export type ParentContentType = z.infer<typeof ParentContentTypeSchema>;
