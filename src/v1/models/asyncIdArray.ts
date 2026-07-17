import { z } from 'zod';
import { AsyncIdSchema } from './asyncId';

export const AsyncIdArraySchema = z.array(AsyncIdSchema);

export type AsyncIdArray = z.infer<typeof AsyncIdArraySchema>;
