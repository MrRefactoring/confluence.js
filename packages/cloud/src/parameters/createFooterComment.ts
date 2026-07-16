import { z } from 'zod';
import { CreateFooterCommentModelSchema } from '../models/index.js';

export const CreateFooterCommentSchema = z.object({}).extend(CreateFooterCommentModelSchema.shape);

export type CreateFooterComment = z.input<typeof CreateFooterCommentSchema>;
