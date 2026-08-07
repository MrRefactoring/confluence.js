import type { z } from 'zod';
import { openEnum } from '#/core';

export const ClassificationLevelStatusSchema = openEnum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);

export type ClassificationLevelStatus = z.infer<typeof ClassificationLevelStatusSchema>;
