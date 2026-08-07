import type { z } from 'zod';
import { openEnum } from '#/core';
/** The status of the content. */

export const ContentStatusSchema = openEnum([
  'current',
  'draft',
  'archived',
  'historical',
  'trashed',
  'deleted',
  'any',
]);

export type ContentStatus = z.infer<typeof ContentStatusSchema>;
