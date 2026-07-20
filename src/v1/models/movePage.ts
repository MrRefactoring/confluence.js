import type { z } from 'zod';
import { apiObject } from '#/core';
import { ContentIdSchema } from './contentId';

export const MovePageSchema = apiObject({
  pageId: ContentIdSchema.optional(),
});

export type MovePage = z.infer<typeof MovePageSchema>;
