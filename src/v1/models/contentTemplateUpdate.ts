import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentTemplateBodyCreateSchema } from './contentTemplateBodyCreate';
import { LabelSchema } from './label';
/** This object is used to update content templates. */

export const ContentTemplateUpdateSchema = apiObject({
  /** The ID of the template being updated. */
  templateId: z.string(),
  /** The name of the template. Set to the current `name` if this field is not being updated. */
  name: z.string(),
  /** The type of the template. Set to `page`. */
  templateType: z.enum(['page']),
  body: ContentTemplateBodyCreateSchema,
  /** A description of the template. */
  description: z.string().max(100, 'description must be at most 100 characters').optional(),
  /** Labels for the template. */
  labels: z.array(LabelSchema).optional(),
  /**
   * The key for the space of the template. Required if the template is a space template. Set this to the current
   * `space.key`.
   */
  space: apiObject({
    key: z.string(),
  }).nullish(),
});

export type ContentTemplateUpdate = z.infer<typeof ContentTemplateUpdateSchema>;
