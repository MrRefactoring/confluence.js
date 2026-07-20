import { z } from 'zod';
import { GroupNameSchema } from '../models';

export const CreateGroupSchema = z.object({}).extend(GroupNameSchema.shape);

export type CreateGroup = z.input<typeof CreateGroupSchema>;
