import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentTemplateBodyCreateSchema } from './contentTemplateBodyCreate';
import { LabelSchema } from './label';
/** This object is used to create content templates. */

export const ContentTemplateCreateSchema = apiObject({
  /** The name of the new template. */
  name: z.string(),
  /** The type of the new template. Set to `page`. */
  templateType: z.string(),
  body: ContentTemplateBodyCreateSchema,
  /** A description of the new template. */
  description: z.string().max(255, 'description must be at most 255 characters').optional(),
  /** Labels for the new template. */
  labels: z.array(LabelSchema).optional(),
  /**
   * The key for the space of the new template. Only applies to space templates. If the spaceKey is not specified, the
   * template will be created as a global template.
   */
  space: apiObject({
    key: z.string(),
  }).nullish(),
});

export type ContentTemplateCreate = z.infer<typeof ContentTemplateCreateSchema>;
