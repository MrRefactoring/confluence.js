import { z } from 'zod';
import { apiObject } from '#/core';
import { ContainerSchema } from './container';
import { VersionSchema } from './version';

export const AttachmentPropertiesUpdateBodySchema = apiObject({
  id: z.string(),
  /** Set this to "attachment" */
  type: z.string(),
  status: z.string().optional(),
  title: z.string().optional(),
  container: ContainerSchema.optional(),
  metadata: apiObject({
    mediaType: z.string().optional(),
  }).optional(),
  extensions: z.record(z.string(), z.any()).optional(),
  version: VersionSchema,
});

export type AttachmentPropertiesUpdateBody = z.infer<typeof AttachmentPropertiesUpdateBodySchema>;
