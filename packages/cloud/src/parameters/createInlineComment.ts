import { z } from 'zod';
import { CreateInlineCommentModelSchema } from '../models/index.js';

export const CreateInlineCommentSchema = z.object({}).extend(CreateInlineCommentModelSchema.shape);

export type CreateInlineComment = z.input<typeof CreateInlineCommentSchema>;
