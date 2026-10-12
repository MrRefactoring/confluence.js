import { z } from 'zod';
import { ContentTemplateCreateSchema } from '../models';

export const CreateContentTemplateSchema = z.object(ContentTemplateCreateSchema.shape);

export type CreateContentTemplate = z.input<typeof CreateContentTemplateSchema>;
