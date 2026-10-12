import { z } from 'zod';
import { SpaceCreateSchema } from '../models';

export const CreatePrivateSpaceSchema = z.object(SpaceCreateSchema.shape);

export type CreatePrivateSpace = z.input<typeof CreatePrivateSpaceSchema>;
