import { z } from 'zod';
import { apiObject } from '#/core';

export const SystemInfoEntitySchema = apiObject({
  cloudId: z.string(),
  commitHash: z.string(),
  baseUrl: z.string().optional(),
  fallbackBaseUrl: z.string().optional(),
  edition: z.string().optional(),
  siteTitle: z.string().optional(),
  defaultLocale: z.string().optional(),
  defaultTimeZone: z.string().optional(),
  microsPerimeter: z.string().optional(),
});

export type SystemInfoEntity = z.infer<typeof SystemInfoEntitySchema>;
