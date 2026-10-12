import { z } from 'zod';
import { CreateInlineCommentModelSchema } from '../models';

export const CreateInlineCommentSchema = z.object(CreateInlineCommentModelSchema.shape);

export type CreateInlineComment = z.input<typeof CreateInlineCommentSchema>;
