import { z } from 'zod';
import { AsyncContentBodySchema } from './asyncContentBody';

export const AsyncContentBodyArraySchema = z.array(AsyncContentBodySchema);

export type AsyncContentBodyArray = z.infer<typeof AsyncContentBodyArraySchema>;
