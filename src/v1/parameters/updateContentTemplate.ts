import { z } from 'zod';
import { ContentTemplateUpdateSchema } from '../models';

export const UpdateContentTemplateSchema = z.object(ContentTemplateUpdateSchema.shape);

export type UpdateContentTemplate = z.input<typeof UpdateContentTemplateSchema>;
