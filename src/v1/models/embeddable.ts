import type { z } from 'zod';
import { apiObject } from '#/core';

export const EmbeddableSchema = apiObject({});

export type Embeddable = z.infer<typeof EmbeddableSchema>;
