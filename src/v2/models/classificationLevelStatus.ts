import { z } from 'zod';

export const ClassificationLevelStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);

export type ClassificationLevelStatus = z.infer<typeof ClassificationLevelStatusSchema>;
