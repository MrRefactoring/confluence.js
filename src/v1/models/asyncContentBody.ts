import { z } from 'zod';
import { apiObject } from '#/core';
import { EmbeddedContentSchema } from './embeddedContent';
import { WebResourceDependenciesSchema } from './webResourceDependencies';
import { GenericLinksSchema } from './genericLinks';

export const AsyncContentBodySchema = apiObject({
  value: z.string().optional(),
  representation: z
    .enum([
      'view',
      'export_view',
      'styled_view',
      'storage',
      'editor',
      'editor2',
      'anonymous_export_view',
      'wiki',
      'atlas_doc_format',
    ])
    .optional(),
  renderTaskId: z.string().optional(),
  error: z.string().optional(),
  /**
   * Rerunning is reserved for when the job is working, but there is a previous run's value in the cache. You may
   * choose to continue polling, or use the cached value.
   */
  status: z.enum(['WORKING', 'QUEUED', 'FAILED', 'COMPLETED', 'RERUNNING']).optional(),
  embeddedContent: z.array(EmbeddedContentSchema).optional(),
  webresource: WebResourceDependenciesSchema.nullish(),
  mediaToken: apiObject({
    collectionIds: z.array(z.string()).optional(),
    contentId: z.string().optional(),
    expiryDateTime: z.string().optional(),
    fileIds: z.array(z.string()).optional(),
    token: z.string().optional(),
  }).nullish(),
  _expandable: apiObject({
    content: z.string().optional(),
    embeddedContent: z.string().optional(),
    webresource: z.string().optional(),
    mediaToken: z.string().optional(),
  }).optional(),
  _links: GenericLinksSchema.optional(),
  content: z.unknown().optional(),
});

export type AsyncContentBody = z.infer<typeof AsyncContentBodySchema>;
