import { z } from 'zod';
import { apiObject } from '#/core';
import { LabelSchema } from './label';
import { ContentTemplateBodySchema } from './contentTemplateBody';
import { GenericLinksSchema } from './genericLinks';

export const BlueprintTemplateSchema = apiObject({
  templateId: z.string(),
  originalTemplate: apiObject({
    pluginKey: z.string(),
    moduleKey: z.string(),
  }),
  referencingBlueprint: z.string(),
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

export type BlueprintTemplate = z.infer<typeof BlueprintTemplateSchema>;
