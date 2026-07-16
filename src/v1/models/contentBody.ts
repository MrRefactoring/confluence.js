import { z } from 'zod';
import { apiObject } from '#/core';
import { EmbeddedContentSchema } from './embeddedContent';
import { WebResourceDependenciesSchema } from './webResourceDependencies';
import { GenericLinksSchema } from './genericLinks';

export const ContentBodySchema = apiObject({
  value: z.string(),
  representation: z.enum([
    'view',
    'export_view',
    'styled_view',
    'storage',
    'editor',
    'editor2',
    'anonymous_export_view',
    'wiki',
    'atlas_doc_format',
    'raw',
  ]),
  embeddedContent: z.array(EmbeddedContentSchema).optional(),
  webresource: WebResourceDependenciesSchema.optional(),
  mediaToken: apiObject({
    collectionIds: z.array(z.string()).optional(),
    contentId: z.string().optional(),
    expiryDateTime: z.string().optional(),
    fileIds: z.array(z.string()).optional(),
    token: z.string().optional(),
  }).optional(),
  _expandable: apiObject({
    content: z.string().optional(),
    embeddedContent: z.string().optional(),
    webresource: z.string().optional(),
    mediaToken: z.string().optional(),
  }).optional(),
  _links: GenericLinksSchema.optional(),
});

export type ContentBody = z.infer<typeof ContentBodySchema>;
