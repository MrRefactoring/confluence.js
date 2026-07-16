import type { z } from 'zod';
import { apiObject } from '#/core';

export const LabelCreateArraySchema = apiObject({});

export type LabelCreateArray = z.infer<typeof LabelCreateArraySchema>;
