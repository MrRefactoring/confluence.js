import type { z } from 'zod';
import { apiObject } from '#/core';

export const AddContentRestrictionUpdateArraySchema = apiObject({});

export type AddContentRestrictionUpdateArray = z.infer<typeof AddContentRestrictionUpdateArraySchema>;
