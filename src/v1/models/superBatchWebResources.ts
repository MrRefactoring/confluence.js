import { z } from 'zod';
import { apiObject } from '#/core';

export const SuperBatchWebResourcesSchema = apiObject({
  uris: apiObject({
    all: z.union([z.array(z.string()), z.string()]).optional(),
    css: z.union([z.array(z.string()), z.string()]).optional(),
    js: z.union([z.array(z.string()), z.string()]).optional(),
  }).optional(),
  tags: apiObject({
    all: z.string().optional(),
    css: z.string().optional(),
    data: z.string().optional(),
    js: z.string().optional(),
  }).optional(),
  metatags: z.string().optional(),
  _expandable: z.record(z.string(), z.any()).optional(),
});

export type SuperBatchWebResources = z.infer<typeof SuperBatchWebResourcesSchema>;
