import { z } from 'zod';
import { SpaceCreateSchema } from '../models';

export const CreateSpaceSchema = z.object({}).extend(SpaceCreateSchema.shape);

export type CreateSpace = z.input<typeof CreateSpaceSchema>;
