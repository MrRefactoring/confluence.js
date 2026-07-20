import { z } from 'zod';
import { apiObject } from '#/core';
import { GenericLinksSchema } from './genericLinks';
/**
 * Shows whether a piece of content has attachments, comments, or child pages/whiteboards.* Note, this doesn't actually
 * contain the child objects.
 */

export const ContentChildTypeSchema = apiObject({
  attachment: apiObject({
    value: z.boolean(),
    _links: GenericLinksSchema,
  }).optional(),
  comment: apiObject({
    value: z.boolean(),
    _links: GenericLinksSchema,
  }).optional(),
  page: apiObject({
    value: z.boolean(),
    _links: GenericLinksSchema,
  }).optional(),
  _expandable: apiObject({
    all: z.string().optional(),
    attachment: z.string().optional(),
    comment: z.string().optional(),
    page: z.string().optional(),
    whiteboard: z.string().optional(),
    database: z.string().optional(),
    embed: z.string().optional(),
    folder: z.string().optional(),
  }).optional(),
});

export type ContentChildType = z.infer<typeof ContentChildTypeSchema>;
