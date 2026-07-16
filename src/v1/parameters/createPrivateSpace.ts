import { z } from 'zod';
import { SpaceCreateSchema } from '../models';

export const CreatePrivateSpaceSchema = z.object({}).extend(SpaceCreateSchema.shape);

export type CreatePrivateSpace = z.input<typeof CreatePrivateSpaceSchema>;
