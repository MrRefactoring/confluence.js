import { z } from 'zod';
import { apiObject } from '#/core';
import { SuperBatchWebResourcesSchema } from './superBatchWebResources';

export const WebResourceDependenciesSchema = apiObject({
  _expandable: apiObject({
    uris: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
  }).optional(),
  keys: z.array(z.string()).optional(),
  contexts: z.array(z.string()).optional(),
  uris: apiObject({
    all: z.union([z.array(z.string()), z.string()]).optional(),
    css: z.union([z.array(z.string()), z.string()]).optional(),
    js: z.union([z.array(z.string()), z.string()]).optional(),
    _expandable: apiObject({
      css: z.union([z.array(z.string()), z.string()]).optional(),
      js: z.union([z.array(z.string()), z.string()]).optional(),
    }).optional(),
  }).optional(),
  tags: apiObject({
    all: z.string().optional(),
    css: z.string().optional(),
    data: z.string().optional(),
    js: z.string().optional(),
    _expandable: z.record(z.string(), z.any()).optional(),
  }).optional(),
  superbatch: SuperBatchWebResourcesSchema.optional(),
});

export type WebResourceDependencies = z.infer<typeof WebResourceDependenciesSchema>;
