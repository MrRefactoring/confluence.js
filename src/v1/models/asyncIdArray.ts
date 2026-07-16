import type { z } from 'zod';
import { apiObject } from '#/core';

export const AsyncIdArraySchema = apiObject({});

export type AsyncIdArray = z.infer<typeof AsyncIdArraySchema>;
