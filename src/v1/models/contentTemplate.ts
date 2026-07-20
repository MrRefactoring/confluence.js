import { z } from 'zod';
import { apiObject } from '#/core';
import { LabelSchema } from './label';
import { ContentTemplateBodySchema } from './contentTemplateBody';
import { GenericLinksSchema } from './genericLinks';

export const ContentTemplateSchema = apiObject({
  templateId: z.string(),
  originalTemplate: apiObject({
    pluginKey: z.string().optional(),
    moduleKey: z.string().optional(),
  }).optional(),
  referencingBlueprint: z.string().optional(),
  name: z.string(),
  description: z.string(),
  space: z.record(z.string(), z.any()).optional(),
  labels: z.array(LabelSchema),
  templateType: z.string(),
  editorVersion: z.string().optional(),
  body: ContentTemplateBodySchema.optional(),
  _expandable: apiObject({
    body: z.string().optional(),
  }).optional(),
  _links: GenericLinksSchema,
});

export type ContentTemplate = z.infer<typeof ContentTemplateSchema>;
