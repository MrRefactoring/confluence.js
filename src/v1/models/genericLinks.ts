import type { z } from 'zod';
import { apiObject } from '#/core';

export const GenericLinksSchema = apiObject({});

export type GenericLinks = z.infer<typeof GenericLinksSchema>;
