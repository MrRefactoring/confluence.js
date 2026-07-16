import type { z } from 'zod';
import { apiObject } from '#/core';

export const AsyncContentBodyArraySchema = apiObject({});

export type AsyncContentBodyArray = z.infer<typeof AsyncContentBodyArraySchema>;
