import { z } from 'zod';
import { SpaceCreateSchema } from '../models';

export const CreateSpaceSchema = z.object(SpaceCreateSchema.shape);

export type CreateSpace = z.input<typeof CreateSpaceSchema>;
